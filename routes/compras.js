const express = require('express')
const Compra = require('mongoose').model('Compra')
const moment = require('moment')

const routes = () => {
  const comprasRoutes = express.Router()
  comprasRoutes.route('/')
    .get((req, res, next) => {
      let filter = {}
      if (req.query.data) {
        const startDate = moment(req.query.data, 'DD/MM/YYYY').utc()
        const endDate = startDate.clone().add(1, 'day')
        filter = Object.assign({}, filter, { data: { $gte: startDate, $lt: endDate } })
      }

      if (req.query.notaFiscal) {
        filter = Object.assign({}, filter, { notaFiscal: { $regex: req.query.notaFiscal, $options: 'i' } })
      }

      if (req.query.ordemMercadoria) {
        filter = Object.assign({}, filter, { 'mercadoria.ordemMercadoria': { $regex: req.query.ordemMercadoria, $options: 'i' } })
      }

      if (req.query.projeto) {
        filter = Object.assign({}, filter, { 'mercadoria.projeto': req.query.projeto })
      }

      Compra.find(filter)
        .populate({ path: 'mercadorias', populate: { path: 'concretagem' } })
        .populate('fornecedor').exec((err, collection) => {
          if (req.query.ordemMercadoria && collection) {
            const matcher = new RegExp(`${req.query.ordemMercadoria}.*`, 'g')
            collection = collection.filter(doc => {
              return matcher.test(doc.mercadoria.ordemMercadoria)
            })
          }

          res.status(200).json(collection)
        })
    })

  comprasRoutes.route('/:id')
    .get((req, res, next) => {
      Compra.findById(req.params.id)
        .populate({ path: 'mercadorias', populate: { path: 'concretagem' } })
        .populate('fornecedor').exec((err, collection) => {
          if (collection === undefined)
            return res.status(404).json({ reason: 'Item not found' })

          return res.status(200).json(collection)
        })
    })

  comprasRoutes.route('/')
    .put((req, res, next) => {

      const options = { new: true, upsert: true, rawResult: true }

      Compra.findOneAndUpdate({ _id: req.body._id }, req.body, options, (err, raw) => {
        if (err) {
          res.status(400);
          return res.json({ reason: err.toString() });
        }

        return res.status(200).json(raw.value)
      })
    })

  comprasRoutes.route('/')
    .post((req, res, next) => {
      const compra = new Compra(req.body)

      compra.save(err => {
        if (err) {
          res.status(400);
          return res.json({ reason: err.toString() });
        }
        return res.status(201).json(compra)
      })
    })

  comprasRoutes.route('/')
    .delete((req, res, next) => {
      Compra.findByIdAndRemove(req.body.id, (err, collection) => {
        if (err)
          return res.status(404).json({ reason: 'Item not found' })

        return res.status(204).json()
      })
    })

  return comprasRoutes
}

module.exports = routes

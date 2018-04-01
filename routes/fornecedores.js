const express = require('express')
const Fornecedor = require('mongoose').model('Fornecedor')

const routes = () => {
  const fornecedoresRoutes = express.Router()
  fornecedoresRoutes.route('/')
    .get((req, res, next) => {
      Fornecedor.find({}).exec((err, collection) => {
        res.json(collection)
      })
    })

  fornecedoresRoutes.route('/:cnpj')
    .get((req, res, next) => {
      Fornecedor.findOne({ cnpj: req.params.cnpj }).exec((err, collection) => {
        res.json(collection)
      })
    })

  fornecedoresRoutes.route('/')
    .post((req, res, next) => {
      const options = { new: true, upsert: true, rawResult: true }

      Fornecedor.findOneAndUpdate({ cnpj: req.body.cnpj }, req.body, options, (err, raw) => {
        if (err) {
          if (err.toString().indexOf('E11000') > -1) {
            err = new Error('CNPJ duplicado');
          }

          return res.status(400).json({ reason: err.toString() })
        }

        res.status(201).json(raw)
      })
    })

  return fornecedoresRoutes
}

module.exports = routes

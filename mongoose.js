const mongoose = require('mongoose')
const compraModel = require('./models/Compra')
const fornecedorModel = require('./models/Fornecedor')

module.exports = function (dbUrl) {
  console.log(dbUrl)
  mongoose.connect(dbUrl).then(
    () => console.log('db open'),
    err => console.error.bind(console, 'connection error'))

  compraModel.createDefaultCompras()
  fornecedorModel.createDefaultFornecedores()
}
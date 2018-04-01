const mongoose = require('mongoose')
const compraModel = require('./models/Compra')
const fornecedorModel = require('./models/Fornecedor')

module.exports = function (dbUrl) {
  console.log(dbUrl)
  mongoose.connect(dbUrl)
    .then(() => console.log('db open'))
    .catch(err => console.log('connection error ', err))

  compraModel.createDefaultCompras()
  fornecedorModel.createDefaultFornecedores()
}
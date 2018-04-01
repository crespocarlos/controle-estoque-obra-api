const mongoose = require('mongoose');

const fornecedorSchema = mongoose.Schema({
  cnpj: { type: String, required: '{PATH} is required!', unique: true, minLength: 14, maxLength: 14 },
  telefone: { type: String, required: '{PATH} is required!' },
  nome: { type: String, required: '{PATH} is required!' },
  email: { type: String, required: '{PATH} is required!' },
  contato: { type: String, required: '{PATH} is required!' },
  estado: {
    type: String,
    enum: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RO', 'RS', 'RR', 'SC', 'SE', 'SP', 'TO'],
    required: '{PATH} is required!'
  },
  cidade: { type: String, required: '{PATH} is required!' },
  endereco: { type: String, required: '{PATH} is required!' },
  cep: { type: String, required: '{PATH} is required!', minLength: 8, maxLength: 8 },
});

const Fornecedor = mongoose.model('Fornecedor', fornecedorSchema);

const createDefaultFornecedores = () => {
  Fornecedor.find({}).exec(function (err, collection) {
    if (collection.length > 0) {
      return
    }

    Fornecedor.create({
      cnpj: '00000000000000',
      nome: 'loja tal',
      telefone: '992418030',
      email: 'ccrespo@ciandt.com',
      contato: 'crespo',
      estado: 'MG',
      cidade: 'Belo Horizonte',
      endereco: 'Rua blá, 240',
      cep: '31015115'
    })
  })
}

module.exports.createDefaultFornecedores = createDefaultFornecedores

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const concretagemSchema = mongoose.Schema({
  caracteristica: String,
  hora: String,
  placaVeiculo: String,
  aplicacao: { type: Number, required: '{PATH} is required!' },
  detalheAplicacao: String
})

const mercadoriaSchema = mongoose.Schema({
  nome: { type: String, required: '{PATH} is required!' },
  quantidade: { type: Number, required: '{PATH} is required!', min: [1, 'Quantidade inválida'] },
  unidadeMedida: { type: Number, required: '{PATH} is required!' },
  valor: { type: Number, required: '{PATH} is required!' },
  projeto: { type: Number, required: '{PATH} is required!' },
  ordemMercadoria: { type: String, required: '{PATH} is required!' },
  quantidadeCompra: { type: Number, required: '{PATH} is required!' },
  dataCompra: { type: Date, required: '{PATH} is required!' },
  concretagem: concretagemSchema
});

const compraSchema = mongoose.Schema({
  data: { type: Date, required: '{PATH} is required!' },
  notaFiscal: { type: String, required: '{PATH} is required!' },
  fornecedor: { type: Schema.Types.ObjectId, ref: 'Fornecedor' },
  mercadoria: mercadoriaSchema
});

const Compra = mongoose.model('Compra', compraSchema);

const createDefaultCompras = () => {
}

module.exports.createDefaultCompras = createDefaultCompras

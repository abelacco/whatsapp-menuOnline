const mongoose = require('mongoose');

const CredencialesSchema = new mongoose.Schema({
  token_meta: {type: String},
  phone_id_meta: {type: String},
  proveedor: {type: String},
  product_id_mayta: {type: String},
  token_mayta: {type: String},
  phone_id_mayta: {type: String},
  phone_number: {type: String},

});


module.exports = mongoose.model('credencialesSchema', CredencialesSchema);
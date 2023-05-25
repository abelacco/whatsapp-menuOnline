// const mongoose = require('mongoose');
// const { connection1 } = require('../config/db');

// const CredencialesSchema = new mongoose.Schema({
//   token_meta: {type: String},
//   phone_id_meta: {type: String},
//   token_permanente: {type: String},
//   proveedor: {type: String},
//   product_id_mayta: {type: String},
//   token_mayta: {type: String},
//   phone_id_mayta: {type: String},
//   phone_number: {type: String},

// });

// console.log("connection1", connection1)

// const CredencialesModel = connection1.model('credencialesSchema', CredencialesSchema);
// module.exports = CredencialesModel;

// module.exports = mongoose.model('credencialesSchema', CredencialesSchema);
const mongoose = require('mongoose');

const CredencialesSchema = new mongoose.Schema({
  token_meta: {type: String},
  phone_id_meta: {type: String},
  token_permanente: {type: String},
  proveedor: {type: String},
  product_id_mayta: {type: String},
  token_mayta: {type: String},
  phone_id_mayta: {type: String},
  phone_number: {type: String},
});

module.exports = CredencialesSchema;
const mongoose = require('mongoose');

const SuscripcionSchema = new mongoose.Schema({
  subdominio: {type: String},
  dominio: {type: String},
  db_name: {type: String},
});


module.exports = mongoose.model('suscripcionSchema', SuscripcionSchema);

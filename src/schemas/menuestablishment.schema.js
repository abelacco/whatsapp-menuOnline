const mongoose = require('mongoose');

const MenuEstablishmentSchema = new mongoose.Schema({
  menuestablishment_id: {type: Number},
  establishment_id: {type: Number},
  menuestablishment_estado: {type: Number},
  menuestablishment_menu: {type: Object}
});


module.exports = mongoose.model('menuestablishmentSchema', MenuEstablishmentSchema);

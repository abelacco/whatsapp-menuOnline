const mongoose = require('mongoose');

const EstablishmentSchema = new mongoose.Schema({
    establishment_id: { type: Number,},
    establishment_department: { type: Number,},
    establishment_city: { type: String,},
    currency_id: { type: Number,},
    establishment_creation: {   type: Date,},
    establishment_name: { type: String,},
    establishment_description: { type: String,},
    establishment_businessname: { type: String,},
    establishment_ruc: { type: String,},
    establishment_district: { type: String,},
    establishment_phone: { type: String,},
    establishment_address: { type: String,},
    establishment_state: { type: Number,},
    establishment_latitude: { type: Number,},
    establishment_longitude: { type: Number,},
    establishment_backgroundimage: { type: String,},
    establishment_logourl: { type: String,},
    establishment_contact: { type: String,},
    establishment_contactdni: {type: String},
    establishment_contactemail: {type: String},
    establishment_contactphone: {type: String},
    establishment_contactchannel: {type: String},
    establishment_whatsapp: {type: Boolean},
    establishment_localid: { type: Number},
    establishment_localjson: { type: Object}
});

module.exports = mongoose.model('establishmentSchema', EstablishmentSchema);
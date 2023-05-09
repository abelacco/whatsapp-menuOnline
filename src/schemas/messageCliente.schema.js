const mongoose = require('mongoose');

const MessageClientSchema = new mongoose.Schema({
    // messageclient_id: { type: Number, auto: true },
    messageclient_phone: { type: String, maxlength: 20 },
    messageclient_message: String,
    messageclient_json: Object,
    messageclient_localid: Number,
    messageclient_step: { type: String, maxlength: 2 },
    messageclient_methodorder: { type: String, maxlength: 1 },
    messageclient_latitude: { type: String, maxlength: 25 },
    messageclient_longitude: { type: String, maxlength: 25 },
    messageclient_clienteid: Number,
    messageclient_fullname: { type: String, maxlength: 200 },
    messageclient_date: Date,
    messageclient_status: { type: String, maxlength: 1 },
    messageclient_textsendwpp: String,
    messageclient_cupon: { type: String, maxlength: 200 },
    messageclient_productjson: Object,
    messageclient_costoenvio: Number,
    messageclient_costoproductos: Number,
    messageclient_descuentocupon: Number,
    messageclient_address: { type: String, maxlength: 250 },
    messageclient_addressreference: { type: String, maxlength: 250 },
    messageclient_total: Number,
    messageclient_tipopago: { type: String, maxlength: 2 },
    messageclient_dateorder: Date,
    messageclient_montominimo: Number,
    messageclient_cupondescuentojson: Object,
    messageclient_proveedorWhastapp: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('messageclientSchemas', MessageClientSchema);
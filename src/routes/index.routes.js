const webHookMaytaWhatsapp = require('./webHookWhatsapp.routes');
const integracionLocal = require('./integracion.routes');



module.exports = (app) => {
    app.use('', webHookMaytaWhatsapp);
    app.use('/integracion', integracionLocal);
}

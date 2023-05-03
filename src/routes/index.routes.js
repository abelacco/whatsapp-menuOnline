const webHookMaytaWhatsapp = require('./webHookWhatsapp.routes');



module.exports = (app) => {
    // app.use('/integracion', messageRoutes);
    app.use('', webHookMaytaWhatsapp);
}

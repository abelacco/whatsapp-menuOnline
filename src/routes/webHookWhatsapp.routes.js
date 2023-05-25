const express = require('express');
const router = express.Router();

const MessageclientController = require('../controllers/messagecliente.controller');
const MessageclientMetaController = require('../controllers/messageclientMeta.controller');
const Security = require('../services/security.services');
const { TOKEN_PARA_META } = require('../config/constants');
const configDB = require('../config/db');
const IntegracionService = require('../services/integracion.services');


// webHookWhatsapp --> Mayta


router.post('/webHookMaytaWhatsapp/:subdominio/:dominio', async (req, res) => {
  Security.obtenerDominiodeSubdominio(req.params.subdominio, req.params.dominio);  
  console.log(req.body)
  const obj = req.body;
  const result = await MessageclientController.addMessageFromWebHoook(obj);
  res.json(result);
});

router.post('/messageLatLngDateClient', async (req, res) => {
    try {
      await configDB.setDbName('demoperu')
      const phone_number = '51942001378'
      const credenciales = await IntegracionService.getCredenciales(phone_number);
        const obj = req.body;
        const result = await MessageclientController.messageLatLngDateClient(obj , credenciales);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/messageProductClient', async (req, res) => {
    try {
      configDB.setDbName('demoperu')
      const phone_number = '51942001378'
      const credenciales = await IntegracionService.getCredenciales(phone_number);
      const obj = req.body;
      const result = await MessageclientController.messageProductClient(obj, credenciales);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// webHookWhatsapp --> Meta

router.post('/webHookMetaWhatsapp/:subdominio/:dominio', async (req, res) => {
  Security.obtenerDominiodeSubdominio(req.params.subdominio, req.params.dominio);
  // Peticion a db con nombre de la db del local y numero de celular que usa el servicio
  // const suscripcion = await Suscripcion.getDatos()
  // let dbName = suscripcion.dbName;
  // let phoneNumber = suscripcion.phoneNumber;
  // Asignar nombre de la db
  const localConnection = await configDB.setDbName('demoperu')
  const phone_number = '51942001378'
  const integracionService = new IntegracionService(localConnection)
  const credenciales = await integracionService.getCredenciales(phone_number);
  console.log("credenciales", credenciales)
  const obj = req.body;
  const result = await MessageclientMetaController.addMessageFromWebHoookMeta(obj, credenciales , integracionService);
  res.json(result);
});

router.get('/webHookMetaWhatsapp/:subdominio/:dominio', async (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];
  if (mode === 'subscribe' && token === TOKEN_PARA_META) {
    console.log('Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.error('Failed webhook verification');
    res.sendStatus(403);
  }
});

router.post('/campanawhatsapp/:subdominio/:dominio', async (req, res) => {
  Security.obtenerDominiodeSubdominio(req.params.subdominio, req.params.dominio);  
  const obj = req.body;
  const result = await MessageclientMetaController.sendMensajeCampanaCrm(obj);
  res.json(result);
});



module.exports = router;
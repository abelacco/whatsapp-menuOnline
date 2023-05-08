const express = require('express');
const router = express.Router();

const MessageclientController = require('../controllers/messagecliente.controller');
const MessageclientMetaController = require('../controllers/messageclientMeta.controller');
const Security = require('../services/security.services');
const { TOKEN_PARA_META } = require('../config/constants');

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
        const obj = req.body;
        const result = await MessageclientController.messageLatLngDateClient(obj);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/messageProductClient', async (req, res) => {
    try {
      const obj = req.body;
      const result = await MessageclientController.messageProductClient(obj);
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
});

// webHookWhatsapp --> Meta

router.post('/webHookMetaWhatsapp/:subdominio/:dominio', async (req, res) => {
  Security.obtenerDominiodeSubdominio(req.params.subdominio, req.params.dominio);  
  const obj = req.body;
  const result = await MessageclientMetaController.addMessageFromWebHoookMeta(obj);
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



module.exports = router;
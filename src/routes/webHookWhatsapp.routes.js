const express = require('express');
const router = express.Router();

const MessageclientController = require('../controllers/messagecliente.controller');
const Security = require('../services/security.services');

router.post('/webHookMaytaWhatsapp/:subdominio/:dominio', async (req, res) => {
  Security.obtenerDominiodeSubdominio(req.params.subdominio, req.params.dominio);  
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



module.exports = router;
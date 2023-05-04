const express = require('express');
const router = express.Router();

const MessageclientController = require('../controllers/messagecliente.controller');

router.post('/webHookMaytaWhatsapp', async (req, res) => {
    const obj = req.body;
    const result = await MessageclientController.addMessageFromWebHoook(obj);
    console.log(result)
    res.json(result);
});

router.post('/messageLatLngDateClient', async (req, res) => {
    try {
        const obj = req.body;
        const result = await MessageclientController.messageLatLngDateClient(obj);
        console.log(result);
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
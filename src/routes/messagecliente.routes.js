const express = require('express');
const router = express.Router();

const MessageclientController = require('../controllers/messagecliente.controller');

router.post('/messageclient', async (req, res) => {
const obj = req.body;
const result = await MessageclientController.add(obj);
// const ctrl =  MessageclientController.add();
// const result = await ctrl.add(obj);
res.status(200).json(result);
});

router.put('/messageclient', async (req, res) => {
const obj = req.body;
const ctrl =  MessageclientController.put();
const result = await ctrl.update(obj);
res.status(200).json(result);
});

router.get('/messageclient/:id', async (req, res) => {
const ctrl = new MessageclientController();
const result = await ctrl.getById(req.params.id);
res.status(200).json(result);
});

router.delete('/messageclient/:id', async (req, res) => {
const ctrl = new MessageclientController();
const result = await ctrl.delete(req.params.id);
res.status(200).json(result);
});

router.get('/listarPorPaginacion/:pagina/:registros', async (req, res) => {
const ctrl = new MessageclientController();
const result = await ctrl.listarPorPaginacion(req.params.pagina, req.params.registros);
res.status(200).json(result);
});

router.get('/getAllActivos', async (req, res) => {
const ctrl = new MessageclientController();
const result = await ctrl.getAllActivos();
res.status(200).json(result);
});

module.exports = router;
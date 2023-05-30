const express = require('express');
const router = express.Router();
const IntegracionController = require('../controllers/integracion.controller');
const { SUCCESS, ERROR } = require('../config/constants');

// router.post('/addCredenciales', async (req, res) => {
   
//     let respuesta = {};
//     let mensaje = "";
//     let data = {};
//     let tipo  = SUCCESS;

//     try {
//         const obj = req.body;
//         const result = await IntegracionController.addCredenciales(obj);
//         if(!result){
//             mensaje = "El registro ya existe";
//         }else{
//             data = result;
//             mensaje = "Registro creado correctamente";
//         }
//         respuesta = { mensaje, data, tipo };
//         res.status(200).json(respuesta);
//     } catch (error) {
//         console.error(error);
//         mensaje = "Error en el servidor";
//         tipo = ERROR;
//         respuesta = { mensaje, data, tipo };
//         res.status(500).json(respuesta);
//     }
// });

router.post('/nuevaIntegracion', async (req, res) => {
    const datosIntegracion = req.body;
    const nuevoLocalIntegrado = await IntegracionController.crearNuevaIntegracion(datosIntegracion);
    res.status(200).json(nuevoLocalIntegrado);
});


module.exports = router;
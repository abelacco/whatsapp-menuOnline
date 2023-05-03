const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require("cors");


// Conexion DB
require('./src/config/db')

/* Inicio de configuración del middlewares */

// Habilitar body-parser
app.use(bodyParser.json());

// Habilitar body-parser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));

// Utilizar morgan para registrar las solicitudes
app.use(morgan('tiny'));

// Habilitar CORS
app.use(cors());

/* Fin de configuración del middlewares */


// Importación de las rutas
require('./src/routes/index.routes')(app);

module.exports = app;

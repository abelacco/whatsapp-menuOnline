const mongoose = require('mongoose');

const DB_NAME = 'demoperu'
// Configuración de la conexión a MongoDB
const dbUrl = `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${DB_NAME}${process.env.DB_OPTIONS}`;

mongoose.set('strictQuery', true);


mongoose.connect(dbUrl, { useNewUrlParser: true }).then(
    () => {console.log(`Database is connected ${DB_NAME}`) },
    err => { console.log('Can not connect to the database' + err)}
);

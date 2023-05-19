const mongoose = require('mongoose');

let DB_NAME = 'demoperu'


const setDbName = async (dbName) => {
    DB_NAME = dbName;
    console.log('DB_NAME', DB_NAME)
    await connectToLocalDb(DB_NAME);
}

// Configuración de la conexión a MongoDB
const dbUrl = `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${DB_NAME}${process.env.DB_OPTIONS}`;

const dbUrlBilling = `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME_BILLNG}:${process.env.DB_PASSWORD_BILLNG}@${process.env.DB_HOST_BILLNG}/${process.env.DB_NAME_BILLING}${process.env.DB_OPTIONS_BILLNG}`;




let connection1 = mongoose.createConnection(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection2 = mongoose.createConnection(dbUrlBilling, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Verificar las conexiones
connection1.on("connected", () => {
    console.log("Connected to Database Locals " + DB_NAME);
});
connection1.on("error", (err) => {
    console.log("Error connecting to Database Locals: " + err);
});

connection2.on("connected", () => {
    console.log("Connected to Database Billing");
});
connection2.on("error", (err) => {
    console.log("Error connecting to Database Billing: " + err);
});

const connectToLocalDb = async (dbName) => {
    const dbUrl = `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${dbName}${process.env.DB_OPTIONS}`;

    // Cierra la conexión existente antes de abrir una nueva
    if (connection1 && connection1.readyState === 1) {
        console.log("entreeeeeee")
        await connection1.close();
        console.log("despues de cerrar")
    }

    connection1 = await mongoose.createConnection(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection1.on("connected", () => {
        console.log("Connected to Database Locals");
    });

    connection1.on("error", (err) => {
        console.log("Error connecting to Database Locals: " + err);
    });

    return connection1;
};


module.exports = {
    setDbName,
    connection1, // Exporta la conexión a la base de datos local
    connection2, // Exporta la conexión a la base de datos de facturación
};

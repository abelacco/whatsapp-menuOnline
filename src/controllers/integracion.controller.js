
const IntegracionService = require('../services/integracion.services');

const addCredenciales = async (credenciales) => {
    try{
        const result = await IntegracionService.addCredenciales(credenciales);
        return result

    }catch(error){
        console.error(error);
        throw new Error('Error en el servidor');
    }
}

const crearNuevaIntegracion = async (datosIntegracion) => {
    try{
        const nuevaIntegracion = await IntegracionService.nuevaIntegracion(datosIntegracion);
        return nuevaIntegracion
    }catch(error){
        console.error(error);
        throw new Error('Error en el servidor');
    }
}

module.exports = {
    addCredenciales,
    crearNuevaIntegracion
}
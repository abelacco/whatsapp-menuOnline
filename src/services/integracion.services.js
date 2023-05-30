CrendencialesSchema = require('../schemas/credenciales.schema');
const EstablishmentService = require('./establishment.services');

class IntegracionService {

    static async nuevaIntegracion(datosIntegracion) {
        const {credenciales , establishment} = datosIntegracion;
        try {
            const nuevasCredenciales = await addCredenciales(credenciales);
            const nuevoLocal = await crearEstablishment(establishment);
            return {nuevasCredenciales , nuevoLocal}
        } catch (error) {
            console.error(error);
            throw new Error('Error en el servidor');
        }

    }

    static async addCredenciales(credenciales) {
        try {
            console.log("entre al servicio")
            const filter = { phone_number: credenciales.phone_number };
    
            // Verificar si el registro ya existe
            const existingRecord = await CrendencialesSchema.findOne(filter);
    
            if (existingRecord) {
                // Si el registro ya existe, devolver 'false'
                return false;
            } else {
                // Si no existe, crear y guardar el nuevo registro
                const newRecord = await CrendencialesSchema.create(credenciales);
                await newRecord.save();
                return newRecord;
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error en el servidor');
        }
    }

    static async getCredenciales() {
        try {
            const result = await CrendencialesSchema.findOne();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error en el servidor');
        }
    }

    static async crearEstablishment(establishment) {
        try {
            const local_id = establishment.local_id;
            const nuevoEstablishment = await EstablishmentService.addEstablishment(establishment);
            const menuEstablishment = await EstablishmentService.getDataCartaByLocalms(local_id);
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error en el servidor');
        }
    }
  
  
  

}

module.exports = IntegracionService;
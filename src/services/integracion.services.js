CredencialesModel = require('../schemas/credenciales.schema');

class IntegracionService {



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

    static async getCredenciales(phone_number) {
        try {
            const result = await CredencialesModel.findOne({phone_number});
            return result;
        } catch (error) {
            console.error("xxxxxxxxxxx",error);
            throw new Error('Error en el servidor');
        }
    }
  
  
  

}

module.exports = IntegracionService;
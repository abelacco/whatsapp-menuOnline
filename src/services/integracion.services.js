CredencialesSchema  = require('../schemas/credenciales.schema');
// const { connection1 } = require('../config/db');

class IntegracionService {

    localConnection;

    constructor(localConnection) {
        this.localConnection = localConnection;
      }

    // static async addCredenciales(credenciales) {
    //     try {
    //         console.log("entre al servicio")
    //         const filter = { phone_number: credenciales.phone_number };
    
    //         // Verificar si el registro ya existe
    //         const existingRecord = await CrendencialesSchema.findOne(filter);
    
    //         if (existingRecord) {
    //             // Si el registro ya existe, devolver 'false'
    //             return false;
    //         } else {
    //             // Si no existe, crear y guardar el nuevo registro
    //             const newRecord = await CrendencialesSchema.create(credenciales);
    //             await newRecord.save();
    //             return newRecord;
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('Error en el servidor');
    //     }
    // }

     async getCredenciales(phone_number) {
        try {
            console.log("entre al servicio")
            const CredencialesModel = this.localConnection.model('credencialesSchema', CredencialesSchema);
            const result = await CredencialesModel.findOne({phone_number});
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error en el servidor');
        }
    }
  
  
  

}

module.exports = IntegracionService;
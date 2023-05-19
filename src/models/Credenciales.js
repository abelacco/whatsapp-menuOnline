
const { PROVEEDOR_META } = require('../config/constants');
const IntegracionService = require('../services/integracion.services');

class CredencialesModel {

    token_meta;
    phone_id_meta;
    proveedor;
    product_id_mayta;
    token_mayta;
    phone_id_mayta;
    phone_number;

    constructor(phone_number) {
        this.setCredenciales(phone_number);
    }

     async setCredenciales(phone_number) {

        const credenciales = await IntegracionService.getCredenciales(phone_number);
        console.log("credencialesxxxxxx", credenciales)
        if (credenciales) {
            this.phone_number = credenciales.phone_number;
            this.proveedor = credenciales.proveedor;

            if (credenciales.proveedor == PROVEEDOR_META) {
                this.token_meta = credenciales.token_meta;
                this.phone_id_meta = credenciales.phone_id_meta;
            } else {
                this.product_id_mayta = credenciales.product_id_mayta;
                this.token_mayta = credenciales.token_mayta;
                this.phone_id_mayta = credenciales.phone_id_mayta;
            }
        } else {
            return "No existen credenciales"
        }

    }


}


module.exports = CredencialesModel;
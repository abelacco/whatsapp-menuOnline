const axios = require('axios');
const { MAYTA_TOKEN, BASE_MAYTA, MAYTA_PRODUCT_ID, MAYTA_PHONE_ID, ERROR, SUCCESS } = require('../config/constants');
const Utility = require('./utility.services');
const rp = require('request-promise-native');


class Maytapi {

    constructor() {
    }

  static  async enviarMensajePorWhatsapp(texto, phone, type = "text", url = "") {
        let objEnvio = {};
        if (type === "text") {
            objEnvio = {
                type,
                message: texto,
                to_number: phone,
            };
        } else if (type === "media") {
            objEnvio = {
                type,
                message: url,
                to_number: phone,
                text: texto,
            };
        } else if (type === "buttons") {
            objEnvio = {
                type,
                message: texto.message,
                to_number: phone,
                buttons: texto.buttons,
            };
        }
        Utility.logs.push(objEnvio);
        return this.peticionClientMaytaCurl(`${BASE_MAYTA}${MAYTA_PRODUCT_ID}/${MAYTA_PHONE_ID}/sendMessage`, "POST", objEnvio, -1);
    }


      static async peticionClientMaytaCurl(url, metodo, body={}, tiempoEspera=-1) {
        let tipo = SUCCESS;
        let mensajes = [];
        let data = {};
    
        try {
            // let config = {
            //     headers: {
            //       "Content-Type": "application/json",
            //       "accept": "application/json",
            //       "x-maytapi-key": MAYTA_TOKEN,
            //     }
            // };
            // let response = await axios.request({
            //     method: metodo,
            //     url: url,
            //     data: JSON.stringify(body),
            //     config: config,
            //     timeout: 10000 // set a timeout of 10 seconds
            // });
            let response = await rp(url, {
                method: 'post',
                json: true,
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'x-maytapi-key': MAYTA_TOKEN,
                },
            });
            return response;
            console.log(response)
            Utility.logs.push("Recuperando respuesta");
            Utility.logs.push(response.data);
    
            if (response?.status >= 200 && response?.status < 300) {
                data.data = response.data;
                data.mensajes = mensajes;
                data.tipo = tipo;
            } else {
                mensajes.push("Ups, problemas en la petición (01).");
                tipo = ERROR;
            }
        } catch (e) {
            Utility.logs.push("Ups, problemas en la petición (02). " + e);
            mensajes.push("Ups, problemas en la petición (02). " + e);
            tipo = ERROR;
        }
    
        if (tipo == ERROR) {
            data.data = {};
            data.mensajes = mensajes;
            data.tipo = tipo;
            Utility.logs.push("Error");
        }
    
        return data;
    }
    
      


}

module.exports = Maytapi;
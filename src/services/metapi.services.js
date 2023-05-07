const axios = require('axios');
const { MAYTA_TOKEN, BASE_MAYTA, MAYTA_PRODUCT_ID, MAYTA_PHONE_ID, ERROR, SUCCESS } = require('../config/constants');
const Utility = require('./utility.services');
const rp = require('request-promise-native');


class MetaApi {

    constructor() {
    }


    static async enviarWhatsAppPorApiOficial(telefono, texto, type = "text", url = "", templateName = "") {
        const objEnvio = {
            messaging_product: "whatsapp",
            to: telefono,
            type: type,
            template: {
                name: templateName,
                language: {
                    code: "es_ES"
                }
            }
        };
        return await this.peticionClientWhatsAppBusiness(objEnvio);
    }


    static async peticionClientWhatsAppBusiness(body = {}) {
        let tipo = SUCCESS;
        let mensajes = [];
        let data = {};

        try {
            console.log("empieza peticion")
            const response = await fetch("https://graph.facebook.com/v16.0/109658868771088/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer EAADh9hg0X1oBAGeL27F6J5n4DxND9ITEIfEZCHqhDn3p6e45eDvqu5PcZBnti3pN66tPZCZBSICWroKvJF5nE1zMsTDJMKQrqtpjQBqa2ZARwGBy87GoEHDjp8p15PSqqpORCbySZBhfh4KgwDsZCMBV93ZCRTFYE0CzBpC1ZCuAZBLW3ZB6yTUM8FX4pJ1VrAtDC8k3iZBaQZA9RWwZDZD"
                },
                body: JSON.stringify(body),
            });
            const http_status = response.status;

            Utility.logs.push(`http_status ${http_status}`);

            if (http_status !== 200) {
                tipo = ERROR;

                const responseJSON = await response.json();

                let mensaje = "No se envio el Whatsapp";

                if (responseJSON.message) {
                    mensaje += ` Whatsapp respondio codigo ${http_status}`;
                }
                mensajes.push(mensaje);
            } else {
                mensajes.push("Enviado");
            }
        } catch (e) {
            console.log("falla en el envio de whatsapp")
            Utility.logs.push(`Ups, problemas en la petición (02). ${e}`);

            if (response) {
                Utility.logs.push(response.body.getContents());
            }

            mensajes.push(`Ups, problemas en la petición (002). ${e}`);
            tipo = ERROR;
        }

        data.data = {};
        data.mensajes = mensajes;
        data.tipo = tipo;

        return data;
    }


    //   static  async enviarMensajePorWhatsapp(texto, phone, type = "text", url = "") {
    //         let objEnvio = {};
    //         if (type === "text") {
    //             objEnvio = {
    //                 type,
    //                 message: texto,
    //                 to_number: phone,
    //             };
    //         } else if (type === "media") {
    //             objEnvio = {
    //                 type,
    //                 message: url,
    //                 to_number: phone,
    //                 text: texto,
    //             };
    //         } else if (type === "buttons") {
    //             objEnvio = {
    //                 type,
    //                 message: texto.message,
    //                 to_number: phone,
    //                 buttons: texto.buttons,
    //             };
    //         }
    //         // Utility.logs.push(objEnvio);
    //         return this.peticionClientMaytaCurl(`${BASE_MAYTA}${MAYTA_PRODUCT_ID}/${MAYTA_PHONE_ID}/sendMessage`, "POST", objEnvio, -1);
    //     }


    //   static async peticionClientMaytaCurl(url, metodo, body={}, tiempoEspera=-1) {
    //     let tipo = SUCCESS;
    //     let mensajes = [];
    //     let data = {};

    //     try {

    //         let response = await rp(url, {
    //             method: 'post',
    //             json: true,
    //             body,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'x-maytapi-key': MAYTA_TOKEN,
    //             },
    //         });

    //         return response;
    //         Utility.logs.push("Recuperando respuesta");
    //         Utility.logs.push(response.data);

    //         if (response?.status >= 200 && response?.status < 300) {
    //             data.data = response.data;
    //             data.mensajes = mensajes;
    //             data.tipo = tipo;
    //         } else {
    //             mensajes.push("Ups, problemas en la petición (01).");
    //             tipo = ERROR;
    //         }
    //     } catch (e) {
    //         Utility.logs.push("Ups, problemas en la petición (02). " + e);
    //         mensajes.push("Ups, problemas en la petición (02). " + e);
    //         tipo = ERROR;
    //     }

    //     if (tipo == ERROR) {
    //         data.data = {};
    //         data.mensajes = mensajes;
    //         data.tipo = tipo;
    //         Utility.logs.push("Error");
    //     }

    //     return data;
    // }




}

module.exports = MetaApi;
const {  ERROR, SUCCESS, META_PHONE_ID } = require('../config/constants');
const Utility = require('./utility.services');
const fetch = require('node-fetch');

class MetaApi {

    constructor() {
    }


    static async enviarWhatsAppPorApiOficial(telefono, type = "text", texto , buttonActions = "", templateName = "") {
        console.log("enviarWhatsAppPorApiOficial")


        let objEnvio = {
            messaging_product: "whatsapp",
            to: telefono,
            type: type,
        };
        // Para Texto

        if(type === "text"){
            objEnvio.text = {
                body: texto
            }
        }
        // Para botones
        else if(type === "interactive"){
            objEnvio.interactive = {
                type: "button",
                body: {
                    text: texto,
                },
                action: {
                    buttons: buttonActions
                }
            }
        }


        
        return await this.peticionClientWhatsAppBusiness(objEnvio);
    }


    static async peticionClientWhatsAppBusiness(body = {}) {
        let tipo = SUCCESS;
        let mensajes = [];
        let data = {};
        console.log(body)
        try {
            console.log("empieza peticion")
            const response = await fetch(`https://graph.facebook.com/v16.0/${META_PHONE_ID}/messages` , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer EAALRutGwJjoBAPqn7xcEFVmSFNULYtOvTcGQ9WluGlgtZBr2armQzpB1SONX1saiJ1ukiWbMJqJ1SWUnLUQMwOZBs3v1tOxQarIiulAK7wAJgmA4cPYxss9L3fe0psvaVYoxcyIILzRJxyjQHwPMCScVi8ZCgdZBZCQvs0IZCVavgegMJcwpMZBfDepaTHdnJBbUbj2LumjdbQGKZC8RVn8a"
                },
                body: JSON.stringify(body),
            });

            console.log("status",response.status)
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
            console.log("falla en el envio de whatsapp", e)
            Utility.logs.push(`Ups, problemas en la petición (02). ${e}`);

            mensajes.push(`Ups, problemas en la petición (002). ${e}`);
            tipo = ERROR;
        }

        data.data = {};
        data.mensajes = mensajes;
        data.tipo = tipo;

        return data;
    }







}

module.exports = MetaApi;
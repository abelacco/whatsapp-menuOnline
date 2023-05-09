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
                    "Authorization": "Bearer EAALRutGwJjoBAK98Kt7uh3zPtHCT0dHWy4NXWos6D0bcxrxT9HZAOpN4gHKJuEPtQGXREWAUJtRHZAREFp7grLcPVIITd7P0Vj5IudlIHDx408WuoRp6HtDkOqLSMUTV5ZBxkPo0a69UeLjicmg5WEKxPG50sOWejPZBa0FKsFwZBp0bnFxaeJzrgYhQzyjoiOyW53ZAVzdhUf6h8OZCKPCYR7Lc4DmtEYZD"
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
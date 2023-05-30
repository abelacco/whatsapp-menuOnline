const { ERROR, SUCCESS, META_PHONE_ID, TOKEN_PERMANENTE, TEMPLATE_LITE } = require('../config/constants');
const Utility = require('./utility.services');
const fetch = require('node-fetch');

class MetaApi {

    constructor() {
    }


    static async enviarWhatsAppPorApiOficial(telefono, type = "text", texto, buttonActions = "", imageUrl = "", url, idTemplate) {


        let objEnvio = {
            messaging_product: "whatsapp",
            to: telefono,
            type: type,
        };
        // Para Texto

        if (type === "text") {
            objEnvio.text = {
                body: texto
            }
        }
        // Para botones
        else if (type === "interactive") {
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
        // Para templates de crm
        else if (type === "template" && !idTemplate) {
      
            let templateName = "crm_con_imagen "

            if (!imageUrl) {
                templateName = "crm_sin_imagen"
            }

            objEnvio.template = {
                name: templateName,
                language: {
                    code: "es"
                }
            }
            let header = {
                type: "header",
                parameters: [
                    {
                        type: "image",
                        image: {
                            link: imageUrl
                        }
                    }
                ]
            }
            let body = {
                type: "body",
                parameters: [
                    {
                        "type": "text",
                        "text": texto
                    }

                ]
            }
            if (templateName == "crm_sin_imagen") {
                objEnvio.template.components = [
                    body
                ]
            } else {
                objEnvio.template.components = [
                    header,
                    body
                ]
            }


        }
        // Para template de lite
        else {

            let templateName = TEMPLATE_LITE[idTemplate];
            objEnvio.template = {
                name: templateName,
                language: {
                    code: "es"
                },
                components: [
                    {
                        type: "button",
                        sub_type: "url",
                        index: "0",
                        parameters: [
                            {
                                "type": "text",
                                "text": url
                            }

                        ]
                    }

                ]

            }


        }
        console.log("objEnvio", objEnvio)
        return await this.peticionClientWhatsAppBusiness(objEnvio);
    }


    static async peticionClientWhatsAppBusiness(body = {}) {

        let tipo = SUCCESS;
        let mensajes = [];
        let data = {};
        try {
            console.log("empieza peticion")
            const response = await fetch(`https://graph.facebook.com/v16.0/${META_PHONE_ID}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${TOKEN_PERMANENTE}`
                },
                body: JSON.stringify(body),
            });

            const http_status = response.status;


            if (http_status !== 200) {
                tipo = ERROR;

                const responseJSON = await response.json();

                let mensaje = "No se envio el Whatsapp";

                if (responseJSON.message) {
                    mensaje += ` Whatsapp respondio codigo ${http_status}`;
                }
                mensajes.push(mensaje);
            } else {
                Utility.logs.push(`Mensaje enviado a ${body.to} , http_status ${http_status}`);
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
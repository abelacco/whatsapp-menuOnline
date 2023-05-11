const { ERROR, SUCCESS, META_PHONE_ID } = require('../config/constants');
const Utility = require('./utility.services');
const fetch = require('node-fetch');

class MetaApi {

    constructor() {
    }


    static async enviarWhatsAppPorApiOficial(telefono, type = "text", texto, buttonActions = "", imageUrl = "") {
        console.log("enviarWhatsAppPorApiOficial")


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
        // Para templates
        else if (type === "template") {

            let templateName = "crm_sin_cupon_no_dinamico"
            let imageUrlAlter = "https://res.cloudinary.com/dbq85fwfz/image/upload/v1683769227/266830776_1029167034298709_8217632826314384432_n_1_hqsgr4.jpg"

            objEnvio.template = {
                name: templateName,
                language: {
                    code: "es"
                }
            }

            objEnvio.template.components = [
                {
                    type: "header",
                    parameters: [
                        {
                            type: "image",
                            image: {
                                link: imageUrl || imageUrlAlter
                            }
                        }
                    ]
                },
                {
                    type: "body",
                    parameters: [
                        {
                            "type": "text",
                            "text": texto
                        }
    
                       
                    ]
                }
            ]

            // if (!imageUrl) {
            //     // templateName = "crm_sin_cupon_sin_imagen"
            //     // objEnvio.template.components = [
            //     //     {
            //     //         type: "body",
            //     //         parameters: [
            //     //             {
            //     //                 "type": "text",
            //     //                 "text": texto
            //     //             }
            //     //         ]
            //     //     }
            //     // ]
            // } else {
            //     objEnvio.template.components = [
            //         {
            //             type: "header",
            //             parameters: [
            //                 {
            //                     type: "image",
            //                     image: {
            //                         link: imageUrl || imageUrlAlter
            //                     }
            //                 }
            //             ]
            //         },
            //         {
            //             type: "body",
            //             parameters: [
            //                 {
            //                     "type": "text",
            //                     "text": texto
            //                 }
        
                           
            //             ]
            //         }
            //     ]
            // }

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
            const response = await fetch(`https://graph.facebook.com/v16.0/${META_PHONE_ID}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer EAALRutGwJjoBAJPsQlLfPtvCXuooOAmeSqZALZClXXZArOgYpCFgoDKwqaBVL7Jx4g5LucHwaA8DeezW5SOlXSYC0ifEN5a40gj56qcBicxTONCRXZCxZADYDEeZAoPb8ofz7yNXx3ZC7savKZCp9GGZCol7idw818PdBqBd8xSknGF8ZAAaHhZA3XaWoTyHmjzvnpCZBIJzWjhWDjXA1gR1gvIb"
                },
                body: JSON.stringify(body),
            });

            console.log("status", response.status)
            const http_status = response.status;

            Utility.logs.push(`Mensaje eniado a ${body.to} , http_status ${http_status}`);

            if (http_status !== 200) {
                tipo = ERROR;

                const responseJSON = await response.json();

                let mensaje = "No se envio el Whatsapp";

                if (responseJSON.message) {
                    mensaje += ` Whatsapp respondio codigo ${http_status}`;
                }
                mensajes.push(mensaje);
            } else {
                mensajes.push("Enviado" );
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
const {
    DELIVERY_PAYMENT_CE,
    DELIVERY_PAYMENT_CE_TXT,
    DELIVERY_PAYMENT_CP,
    DELIVERY_PAYMENT_CP_TXT,
    DELIVERY_MODALIDAD_INMEDIATA,
    DELIVERY_MODALIDAD_INMEDIATA_TXT,
    DELIVERY_MODALIDAD_PORRECOGER,
    DELIVERY_MODALIDAD_PORRECOGER_TXT,
    DELIVERY_MODALIDAD_PROGRAMADO,
    DELIVERY_MODALIDAD_PROGRAMADO_TXT,
    CHATBOOT_TYPEMSG_BTN,
    CHATBOOT_MSG_RESET,
    CHATBOOT_STEP_CREATEORDER,
    CHOOSE_PRODUCTS,
    DELIVERY_UPDATE_ORDER,
    DELIVERY_CONFIRM_ORDER,
    DELIVERY_CONFIRM_ORDER_TXT,
    DELIVERY_UPDATE_ORDER_TXT,
    CHOOSE_PRODUCTS_TXT,
    CHATBOOT_LIMIT_LASTMESSAGE,
    ACTIVO,
    CHATBOOT_STEP_START,
    CHATBOOT_STEP_LOCATION,
    CHATBOOT_STEP_RECOJODATE,
    CHATBOOT_STEP_SCHEDULEDDATE,
    CHATBOOT_STEP_SELECTPRODUCT,
    NAME_TEMPLATE_STEP_ONE,
    TYPE_MESSAGE_META_RECIVE_TEXT,
    TYPE_MESSAGE_META_RECIVE_BUTTON,
    NAME_TEMPLATE_STEP_TWO_INMEDIATO,
    PROVEEDOR_META,
    CHOOSE_PRODUCTS_TXT_META,
    DELIVERY_UPDATE_ORDER_TXT_META,
    DELIVERY_CONFIRM_ORDER_TXT_META,
    DELIVERY_PAYMENT_CE_TXT_META,
    DELIVERY_PAYMENT_CP_TXT_META
} = require('../config/constants');
const MessageClienteSchema = require('../schemas/messageCliente.schema');
const Security = require('../services/security.services')
const Utility = require('../services/utility.services');
const Establishment = require('../services/establishment.services');
const Bitly = require('../services/bitly.services');



class MessageclientModel {

    messageclient_modelId;
    messageclient_id;
    messageclient_phone;
    messageclient_message;
    messageclient_json;
    messageclient_localid;
    messageclient_step;
    messageclient_methodorder;
    messageclient_latitude;
    messageclient_longitude;
    messageclient_clienteid;
    messageclient_fullname;
    messageclient_date;
    messageclient_status;
    messageclient_textsendwpp;
    messageclient_cupon;
    messageclient_productjson;
    messageclient_costoenvio;
    messageclient_costoproductos;
    messageclient_descuentocupon;
    messageclient_address;
    messageclient_addressreference;
    messageclient_total;
    messageclient_tipopago;
    messageclient_dateorder;
    messageclient_montominimo;
    messageclient_cupondescuentojson;
    messageclient_proveedorWhastapp;

    constructor(lastMessage = null) {
        // super();
        //this.lastMessage = lastMessage;
        this.setLastMessage(lastMessage);
    }

    setLastMessage(lastMessage) {
        // console.log("asdsadasdsa",lastMessage)
        this.messageclient_modelId = lastMessage?._id || null;
        // console.log("asdsadsad",this.messageclient_modelId)
        this.messageclient_id = lastMessage?.messageclient_id || null;
        this.messageclient_phone = lastMessage?.messageclient_phone || null;
        this.messageclient_message = lastMessage?.messageclient_message || null;
        this.messageclient_json = lastMessage?.messageclient_json || null;
        this.messageclient_localid = lastMessage?.messageclient_localid || null;
        this.messageclient_step = lastMessage?.messageclient_step || null;
        this.messageclient_methodorder = lastMessage?.messageclient_methodorder || null;
        this.messageclient_latitude = lastMessage?.messageclient_latitude || null;
        this.messageclient_longitude = lastMessage?.messageclient_longitude || null;
        this.messageclient_clienteid = lastMessage?.messageclient_clienteid || null;
        this.messageclient_fullname = lastMessage?.messageclient_fullname || null;
        this.messageclient_date = lastMessage?.messageclient_date || null;
        this.messageclient_status = lastMessage?.messageclient_status || null;
        this.messageclient_textsendwpp = lastMessage?.messageclient_textsendwpp || null;
        this.messageclient_cupon = lastMessage?.messageclient_cupon || null;
        this.messageclient_productjson = lastMessage?.messageclient_productjson || null;
        this.messageclient_costoenvio = lastMessage?.messageclient_costoenvio || null;
        this.messageclient_costoproductos = lastMessage?.messageclient_costoproductos || null;
        this.messageclient_descuentocupon = lastMessage?.messageclient_descuentocupon || null;
        this.messageclient_address = lastMessage?.messageclient_address || null;
        this.messageclient_addressreference = lastMessage?.messageclient_addressreference || null;
        this.messageclient_total = lastMessage?.messageclient_total || null;
        this.messageclient_tipopago = lastMessage?.messageclient_tipopago || null;
        this.messageclient_dateorder = lastMessage?.messageclient_dateorder || null;
        this.messageclient_montominimo = lastMessage?.messageclient_montominimo || null;
        this.messageclient_cupondescuentojson = lastMessage?.messageclient_cupondescuentojson || null;
        this.messageclient_proveedorWhastapp = lastMessage?.messageclient_proveedorWhastapp || null;

    }

    getMessageclient_tipopagoTxt() {
        if (this.getMessageclient_tipopago() === DELIVERY_PAYMENT_CE) {
            return DELIVERY_PAYMENT_CE_TXT;
        }
        if (this.getMessageclient_tipopago() === DELIVERY_PAYMENT_CP) {
            return DELIVERY_PAYMENT_CP_TXT;
        }
        return '';
    }

    getMessageclient_methodorderTxt() {
        if (this.getMessageclient_methodorder() === DELIVERY_MODALIDAD_INMEDIATA) {
            return DELIVERY_MODALIDAD_INMEDIATA_TXT;
        } else if (this.getMessageclient_methodorder() === DELIVERY_MODALIDAD_PORRECOGER) {
            return DELIVERY_MODALIDAD_PORRECOGER_TXT;
        } else if (this.getMessageclient_methodorder() === DELIVERY_MODALIDAD_PROGRAMADO) {
            return DELIVERY_MODALIDAD_PROGRAMADO_TXT;
        }
        return '';
    }

    getMessageclient_jsonToObj() {
        return JSON.parse(this.getMessageclient_json());
    }

    getMessageclient_jsonToObjMeta() {
        return JSON.parse(this.getMessageclient_json()).entry[0].changes[0].value.messages[0];
    }

    clearAttr() {
        this.setMessageclient_methodorder(null);
        this.setMessageclient_latitude(null);
        this.setMessageclient_longitude(null);
        this.setMessageclient_localid(null);
        this.setMessageclient_cupon(null);
        this.setMessageclient_costoenvio(null);
        this.setMessageclient_costoproductos(null);
        this.setMessageclient_descuentocupon(null);
        this.setMessageclient_productjson(null);
        this.setMessageclient_address(null);
        this.setMessageclient_addressreference(null);
        this.setMessageclient_total(null);
        this.setMessageclient_dateorder(null);
        this.setMessageclient_montominimo(null);
        this.setMessageclient_status(ACTIVO);
    }



    mensajeValido() {
        let mensajeValido = false;

        let messageArray = this.messageclient_json;
        if ("message" in messageArray && !("participants" in messageArray) && "type" in messageArray && messageArray["type"] == "message") {
            let message = messageArray["message"];
            if ("fromMe" in message) {
                if (message["fromMe"] == false) {
                    this.setearValoresPrincipalesFromMessageJson();
                    mensajeValido = true;
                }
            }
        } else {
            console.log("false")
            mensajeValido = false;
        }

          
        return mensajeValido;
    }

    setearValoresPrincipalesFromMessageJson() {

        let messageArray = this.messageclient_json;

        let message = messageArray["message"];

        this.setMessageclient_message(message["text"]);

        if ("user" in messageArray) {

            let user = messageArray["user"];

            this.setMessageclient_phone(user["phone"]);
        }

        this.setMessageclient_json(JSON.stringify(this.messageclient_json));

    }

    mensajeValidoMeta() {
        let mensajeValido = false;

        let messageArray = this.messageclient_json.entry[0].changes[0].value;
        console.log("messageArray", messageArray)

        if ("messages" in messageArray && messageArray["messages"].length > 0) {
            let message = messageArray["messages"][0];
            if (message["from"] !== "me") {
              this.setearValoresPrincipalesFromMessageJsonMeta();
              mensajeValido = true;
            }
          } else {
            console.log("false");
            mensajeValido = false;
          }
          
        return mensajeValido;
    }

    setearValoresPrincipalesFromMessageJsonMeta() {

        let messageArray = this.messageclient_json.entry[0].changes[0].value;
        let message = messageArray["messages"][0]

        // Tipo de variable que llega de META (text, button , etc)

        if(message.type == TYPE_MESSAGE_META_RECIVE_TEXT && message["text"].body){
            this.setMessageclient_message(message["text"].body);
        }else if(message.type == TYPE_MESSAGE_META_RECIVE_BUTTON && message["button"].text) {
            this.setMessageclient_message(message["button"].text);
        }

        // if ("user" in messageArray) {

        //     let user = messageArray["user"];

        //     this.setMessageclient_phone(user["phone"]);
        // }
        this.setMessageclient_phone(message["from"]);


        this.setMessageclient_json(JSON.stringify(this.messageclient_json));

    }




    async getLastMessageByPhone() {

        const lastMessage = await MessageClienteSchema.findOne({
            messageclient_status: 1,
            messageclient_phone: this.getMessageclient_phone()
        }).sort({ _id: -1 }).limit(1);
        return lastMessage ? new MessageclientModel(lastMessage) : null;


    }

    // MESSAGE WPP
    static async getMessageStepOne(phone, clienteName = null) {
        let messageObjWpp = new Object();
        messageObjWpp.message = "¡Hola! 👋 ¡Bienvenid@ a nuestro chatbot! Estoy aquí para ayudarte a encontrar los productos que amas y brindarte el mejor servicio. Por favor, escoge una modalidad para comenzar:";
        messageObjWpp.type = CHATBOOT_TYPEMSG_BTN;
        messageObjWpp.buttons = await Establishment.getEstablishmentButtonsMetodoDelivery();
        return messageObjWpp;
    }

    static async getMessageStepOneMeta() {
        let messageObjWpp = new Object();
        messageObjWpp.message = "¡Hola! 👋 ¡Bienvenid@ a nuestro chatbot! Estoy aquí para ayudarte a encontrar los productos que amas y brindarte el mejor servicio. Por favor, escoge una modalidad para comenzar:";
        messageObjWpp.buttons = await Establishment.getEstablishmentButtonsMetodoDeliveryMeta();
        console.log("messageObjWpp", messageObjWpp)
        return messageObjWpp;
    }

    static async getMessageStepDeliveryInmediato(phone, clienteName = null) {
        return  `${clienteName ? `${clienteName}\n` : ''}Envía tu ubicación o dirección a través  del siguiente link para encontrar el restaurante más cercano \n ${ await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/map-boot-select?phone=${phone}`)} ! \n`;
    }

    static async getMessageStepDeliveryInmediatoMeta(phone, clienteName = null) {
        let messageObjWpp = new Object();
        // messageObjWpp.message = `${clienteName ? `${clienteName}\n` : ''} Envía tu ubicación o dirección a través  del siguiente link para encontrar el restaurante más cercano \n ${ await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/map-boot-select?phone=${phone}`)} ! \n`;
        // para deploy abel
        messageObjWpp.message = `${clienteName ? `${clienteName}\n` : ''} Envía tu ubicación o dirección a través  del siguiente link para encontrar el restaurante más cercano \n ${ await Bitly.getLinkEncodedMsQuipu(`https://menuonline-dbe64.web.app/carta-digital/#/map-boot-select?phone=${phone}`)} ! \n`;

        messageObjWpp.buttons = [];
        return messageObjWpp;
    }

    static async getMessageStepDeliveryRecojoTienda(phone, clienteName = null) {
        return `${clienteName ? `${clienteName}\n` : ''}Para seleccionar tu fecha de recojo, por favor, accede al siguiente enlace: \n${await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/inicio?deliveryMethod=2&phone=${phone}`)}`;
    }
    static async getMessageStepDeliveryRecojoTiendaMeta(phone, clienteName = null) {
        let messageObjWpp = new Object();
        // messageObjWpp.message = `${clienteName ? `${clienteName}\n` : ''}Para seleccionar tu fecha de recojo, por favor, accede al siguiente enlace: \n${await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/inicio?deliveryMethod=2&phone=${phone}`)}`;
        // para deploy abel
        messageObjWpp.message = `${clienteName ? `${clienteName}\n` : ''}Para seleccionar tu fecha de recojo, por favor, accede al siguiente enlace: \n${await Bitly.getLinkEncodedMsQuipu(`https://menuonline-dbe64.web.app/carta-digital/#/inicio?deliveryMethod=2&phone=${phone}`)}`;

        messageObjWpp.buttons = [];
        return messageObjWpp;
    }

    static async getMessageStepDeliveryProgramado(phone, clienteName = null) {
        return `${clienteName ? `${clienteName}\n` : ''}Envía tu ubicación o dirección a través del siguiente link para encontrar el restaurante más cercano \n ${await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/map-boot-select?phone=${phone}&deliveryMethod=3`)} ! \n`;
    }

    static async getMessageStepDeliveryProgramadoMeta(phone, clienteName = null) {
        let messageObjWpp = new Object();
        // messageObjWpp.message = `${clienteName ? `${clienteName}\n` : ''}Envía tu ubicación o dirección a través del siguiente link para encontrar el restaurante más cercano \n ${await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/map-boot-select?phone=${phone}&deliveryMethod=3`)} ! \n`;
        // para deploy abel
        messageObjWpp.message = `${clienteName ? `${clienteName}\n` : ''}Envía tu ubicación o dirección a través del siguiente link para encontrar el restaurante más cercano \n ${await Bitly.getLinkEncodedMsQuipu(`https://menuonline-dbe64.web.app/carta-digital/#/map-boot-select?phone=${phone}&deliveryMethod=3`)} ! \n`;
       
        messageObjWpp.buttons = [];
        return messageObjWpp;
    }

    static getMessageStepThree(phone, clienteName = null) {
        let message = `${Utility.getUUID()} \n Entrega de MARACUYA 05 LIMA
        Tiempo estimado de entrega: 30min
        Costo del envío: S/.6.50
        Monto mínimo de compra: S/.0.00
        Si tienes un código de cupón, escríbelo AHORA   \n${Utility.getUUID()}, en caso contrario escribe 1`;
        if (clienteName)
            message = `${Utility.getUUID()}\n ${clienteName} \nEntrega de PH 05 LIMA
        Tiempo estimado de entrega: 30min
        Costo del envío: S/.6.50
        Monto mínimo de compra: S/.0.00
        Si tienes un código de cupón, escríbelo ahora \n${Utility.getUUID()}, en caso contrario escribe 1`;
        return message;
    }

    static getMessageStepThreev2(localname, costoenvio, montominimo) {
        let message = `Entrega de ${localname} \n*Costo del envío: S/ ${Utility.roundNumber(costoenvio)} 🚚💰 \n*Monto mínimo de compra: S/ ${Utility.roundNumber(montominimo)} 💸 \n¿Tienes un código de cupón? Escríbelo ahora y obtén un descuento especial. ✨🎁   \n`;
        let messageObjWpp = new Object();
        messageObjWpp.message = message;
        messageObjWpp.type = CHATBOOT_TYPEMSG_BTN;
        messageObjWpp.buttons = [];
        messageObjWpp.buttons.push({ id: CHOOSE_PRODUCTS, text: CHOOSE_PRODUCTS_TXT });
        return messageObjWpp;
    }

    static getMessageStepRecojoTienda(localname , proveedor) {

        let messageObjWpp = new Object();

        if(proveedor == PROVEEDOR_META){
             messageObjWpp.message = `Escogio su pedido para recoger en ${localname} \nAquí están algunos detalles importantes que debes tener en cuenta: \n¿Tienes un código de cupón? Escríbelo ahora y obtén un descuento especial. ✨🎁\n`;
             messageObjWpp.buttons = [{type:'reply', reply:{ id: CHOOSE_PRODUCTS, title: CHOOSE_PRODUCTS_TXT_META }}];
        }else{
        
            let message = `Escogio su pedido para recoger en ${localname} \nAquí están algunos detalles importantes que debes tener en cuenta: \n¿Tienes un código de cupón? Escríbelo ahora y obtén un descuento especial. ✨🎁\n`;
            messageObjWpp = {
                 message: message,
                 type: CHATBOOT_TYPEMSG_BTN,
                 buttons: [{ id: CHOOSE_PRODUCTS, text: CHOOSE_PRODUCTS_TXT }]
             };
         }
         return messageObjWpp;
    }


    static getMessageStepSuccesProgramado(localname, montominimo) {
        let message = `Entrega de ${localname} \nEnviaremos tu pedido de comida saludable directamente a tu hogar u oficina. Aquí están algunos detalles importantes que debes tener en cuenta: \n*Monto mínimo de compra: S/ ${Utility.roundNumber(montominimo)} 💸 \n¿Tienes un código de cupón? Escríbelo ahora y obtén un descuento especial. ✨🎁   \n`;
        let messageObjWpp = {
            message: message,
            type: CHATBOOT_TYPEMSG_BTN,
            buttons: [{ id: CHOOSE_PRODUCTS, text: CHOOSE_PRODUCTS_TXT }]
        };
        return messageObjWpp;
    }

    static getMessageStepThreev3(localname, costoenvio, montominimo , proveedor) {
        let messageObjWpp = new Object();

       if(proveedor == PROVEEDOR_META){
            messageObjWpp.message = `Entrega de ${localname} \nEnviaremos tu pedido de comida directamente a tu hogar u oficina. Aquí están algunos detalles importantes que debes tener en cuenta: \n*Costo del envío: S/ ${Utility.roundNumber(costoenvio)} 🚚💰 \n*Monto mínimo de compra: S/ ${Utility.roundNumber(montominimo)} 💸 \n¿Tienes un código de cupón? Escríbelo ahora y obtén un descuento especial. ✨🎁   \n`
            messageObjWpp.buttons = [{type:'reply', reply:{ id: CHOOSE_PRODUCTS, title: CHOOSE_PRODUCTS_TXT_META }}];
       }else{
       
            let message = `Entrega de ${localname} \nEnviaremos tu pedido de comida  directamente a tu hogar u oficina. Aquí están algunos detalles importantes que debes tener en cuenta: \n*Costo del envío: S/ ${Utility.roundNumber(costoenvio)} 🚚💰 \n*Monto mínimo de compra: S/ ${Utility.roundNumber(montominimo)} 💸 \n¿Tienes un código de cupón? Escríbelo ahora y obtén un descuento especial. ✨🎁   \n`;
            messageObjWpp = {
                message: message,
                type: CHATBOOT_TYPEMSG_BTN,
                buttons: [{ id: CHOOSE_PRODUCTS, text: CHOOSE_PRODUCTS_TXT }]
            };
        }
        return messageObjWpp;
    }


    static async getMessageStepFour(phone, clienteName = null, local_id = null) {
        return `${clienteName != null ? clienteName + "\n" : ""}Encuentra todos los productos que necesitas en nuestro catálogo en línea.\n Haz clic en este enlace para comenzar a seleccionar tus productos: \n\n ${await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/tienda/${local_id}?phone=${phone}`)}\n\n Gracias por elegirnos. ¡Estamos emocionados de ser parte de tu experiencia de compra! 🛍️👩‍💻`;
    }

    static async getMessageStepFourMeta(phone, clienteName = null, local_id = null) {
        let messageObjWpp = new Object();
        // messageObjWpp.message = `${clienteName != null ? clienteName + "\n" : ""}Encuentra todos los productos que necesitas en nuestro catálogo en línea.\n Haz clic en este enlace para comenzar a seleccionar tus productos: \n\n ${await Bitly.getLinkEncodedMsQuipu(`https://${Security.getSubdomain()}.${Security.getDominio()}/carta-digital/#/tienda/${local_id}?phone=${phone}`)}\n\n Gracias por elegirnos. ¡Estamos emocionados de ser parte de tu experiencia de compra! 🛍️👩‍💻`;
        // para deploy abel
        messageObjWpp.message = `${clienteName != null ? clienteName + "\n" : ""}Encuentra todos los productos que necesitas en nuestro catálogo en línea.\n Haz clic en este enlace para comenzar a seleccionar tus productos: \n\n ${await Bitly.getLinkEncodedMsQuipu(`https://menuonline-dbe64.web.app}/carta-digital/#/tienda/${local_id}?phone=${phone}`)}\n\n Gracias por elegirnos. ¡Estamos emocionados de ser parte de tu experiencia de compra! 🛍️👩‍💻`;

        messageObjWpp.buttons = [];
        return messageObjWpp;
    }

    static async getMessageStepOrderSeguimiento(phone, id) {
        return `Tu pedido con codigo #${id} fue creado con exito.😄👍 \nPara seguir el progreso de tu pedido, por favor, accede al siguiente enlace: \n\nhttps://${ Security.getSubdomain()}.${Security.getDominio()}/tracking/#/tracking/${id} \n\nGracias por elegirnos. ¡Esperamos que disfrutes de tus productos! 🛍️🚚`;
    }
    static async getMessageStepOrderSeguimientoMeta(phone, id) {
        let messageObjWpp = new Object();
        messageObjWpp.message = `Tu pedido con codigo #${id} fue creado con exito.😄👍 \nPara seguir el progreso de tu pedido, por favor, accede al siguiente enlace: \n\nhttps://${ Security.getSubdomain()}.${Security.getDominio()}/tracking/#/tracking/${id} \n\nGracias por elegirnos. ¡Esperamos que disfrutes de tus productos! 🛍️🚚`;
        messageObjWpp.buttons = [];
        return messageObjWpp;
    }

    static async getMessageStepOrderRecojoTienda(phone, id, dateOrder) {
        return `Tu pedido con codigo #${id} fue creado con exito.😄👍 \nPara seguir el progreso de tu pedido, por favor, accede al siguiente enlace: \n\nhttps://${ Security.getSubdomain()}.${Security.getDominio()}/tracking/#/tracking/${id} \n\nRecogeras tu pedido el
    dia: ${dateOrder}\n Gracias por elegirnos. ¡Esperamos que disfrutes de tus productos! 🛍️🚚`;
    }

    static async getMessageStepOrderRecojoTiendaMeta(phone, id, dateOrder) {
        let messageObjWpp = new Object();
        messageObjWpp.message =  `Tu pedido con codigo #${id} fue creado con exito.😄👍 \nPara seguir el progreso de tu pedido, por favor, accede al siguiente enlace: \n\nhttps://${ Security.getSubdomain()}.${Security.getDominio()}/tracking/#/tracking/${id} \n\nRecogeras tu pedido el
        dia: ${dateOrder}\n Gracias por elegirnos. ¡Esperamos que disfrutes de tus productos! 🛍️🚚`;
        messageObjWpp.buttons = [];
        return messageObjWpp;
    }

    static getMessageStepConfirmOrderOrUpdateProducts(phone, productos, totalaPagar, formaEntrega, nombre, direccion, costoenvio, dateOrder, proveedor) {
        let txtProductos = "";
        if (productos) {
            let productosJson = JSON.parse(productos);
            if (productosJson && Array.isArray(productosJson) && productosJson.length > 0) {
                txtProductos += "Gracias por elegir nuestros productos. Aquí está el resumen de tu pedido: \n \n";
                productosJson.forEach(value => {
                    txtProductos += `${value.pedido_cantidad} ${value.pedido_productodescripcion} S/ ${Utility.roundNumber(value.pedido_importe)} \n`;
                });
                txtProductos += "-----------------------\n";
                if (costoenvio && formaEntrega !== DELIVERY_MODALIDAD_PORRECOGER_TXT) {
                    txtProductos += `💰 Costo de envío: S/ ${Utility.roundNumber(costoenvio)} 🚚💰 \n \n`;
                }

                txtProductos += `💰 Total a pagar: S/ ${Utility.roundNumber(totalaPagar)} 💸 \n \n`;
      
                txtProductos += `🛵 Forma de entrega solicitada:\n ${formaEntrega}\n \n`;

                txtProductos += "👤 Información de contacto: \n";
                if (nombre && nombre !== "") txtProductos += `Nombre: ${nombre}\n`;
                if (direccion && direccion !== "") txtProductos += `Dirección: ${direccion} 🏠📍\n`;
                txtProductos += `Número de celular: ${phone} 📱📞\n`;

                if (formaEntrega !== DELIVERY_MODALIDAD_INMEDIATA_TXT && dateOrder) {


                    if (formaEntrega === DELIVERY_MODALIDAD_PORRECOGER_TXT) {
                        txtProductos += `🗓️ Fecha de recogo: ${Utility.obtenerFechaConFormato(dateOrder)} \n \n`;
                    }
                    if (formaEntrega === DELIVERY_MODALIDAD_PROGRAMADO_TXT) {

                        txtProductos += `🗓️ Fecha de envío: ${Utility.obtenerFechaConFormato(dateOrder)} \n \n`;
                    }
                }

            }
        }
        let messageObjWpp = {}

        if(proveedor == PROVEEDOR_META) {
            messageObjWpp.message = `${txtProductos} \n\nEscoge una de las opciones:`,
            messageObjWpp.buttons = [{type:'reply', reply:{ id: DELIVERY_UPDATE_ORDER, title: DELIVERY_UPDATE_ORDER_TXT_META }}, {type:'reply', reply:{ id: DELIVERY_CONFIRM_ORDER, title: DELIVERY_CONFIRM_ORDER_TXT_META }}];

        } else {
            messageObjWpp.message = `${txtProductos} \n\nEscoge una de las opciones:`,
            messageObjWpp.type = CHATBOOT_TYPEMSG_BTN,
            messageObjWpp.buttons = [{ id: DELIVERY_UPDATE_ORDER, text: DELIVERY_UPDATE_ORDER_TXT }, { id: DELIVERY_CONFIRM_ORDER, text: DELIVERY_CONFIRM_ORDER_TXT }]
        }

        return messageObjWpp;
    }

    static getMessageStepConfirmTypePayment(phone) {
        let messageObjWpp = {
            message: "Tu pedido está casí listo, ahora escoge una de las opciones de pago:",
            type: CHATBOOT_TYPEMSG_BTN,
            buttons: [{ id: DELIVERY_PAYMENT_CE, text: DELIVERY_PAYMENT_CE_TXT }, { id: DELIVERY_PAYMENT_CP, text: DELIVERY_PAYMENT_CP_TXT }]
        };
        return messageObjWpp;
    }

    static getMessageStepConfirmTypePaymentMeta(phone) {
        let messageObjWpp = {
            message: "Tu pedido está casí listo, ahora escoge una de las opciones de pago:",
            buttons:  [{type:'reply', reply:{ id: DELIVERY_PAYMENT_CE, title: DELIVERY_PAYMENT_CE_TXT_META }}, {type:'reply', reply:{ id: DELIVERY_PAYMENT_CP, title: DELIVERY_PAYMENT_CP_TXT_META }}]

        };

        return messageObjWpp;
    }

    esMessageReset() {
        let messageObj = this.getMessageclient_jsonToObj();
        if (
            messageObj.message &&
            messageObj.message.text &&
            messageObj.message.text.toUpperCase() === CHATBOOT_MSG_RESET
        ) {
            return true;
        }
        return false;
    }

    esMessageResetMeta() {
        let messageObj = this.getMessageclient_jsonToObjMeta();
        if (
            messageObj.type == TYPE_MESSAGE_META_RECIVE_TEXT &&
            messageObj.text &&
            messageObj.text.body.toUpperCase() === CHATBOOT_MSG_RESET

        ) {
            return true;
        }
        return false;
    }

    validarInicioChat() {
        let messageObj = this.getMessageclient_jsonToObj();
        if (
            messageObj.message &&
            messageObj.message.text &&
            messageObj.message.text ==  'PEDIR'
        ) {
            return true;
        }
        return false;
    }

    validarInicioChatMeta() {
        let messageObj = this.getMessageclient_jsonToObjMeta();
        if (
            messageObj.type == TYPE_MESSAGE_META_RECIVE_TEXT &&
            messageObj.text &&
            messageObj.text.body.toUpperCase() === 'PEDIR'
        ) {
            return true;
        }
        return false;
    }

    estaDentroDeltiempo(fechaUltimoMensaje) {
        console.log("getFechaActualFormatoDate",Utility.getFechaActualFormatoDate())
        console.log("fechaUltimoMensaje", fechaUltimoMensaje)

        let horas = Utility.getDiferenciaHoras(fechaUltimoMensaje, Utility.getFechaActualFormatoDate());
        console.log("dif horas", horas)
        if (horas < CHATBOOT_LIMIT_LASTMESSAGE) {
            return true;
        }
        return false;
    }

     formatDate(dateString) {
        // Crear un objeto Date a partir de la fecha proporcionada
        const date = new Date(dateString);
      
        // Extraer los componentes de la fecha
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
      
        // Crear una cadena de texto con el formato deseado
        const formattedDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
        return formattedDate;
      }

    getMessageclient_productJsonToObj() {
        return JSON.parse(this.getMessageclient_productjson());
    }

    createOrderObj() {
        let objDelivery = {
            listaPedidos: [],
            cliente: {},
            delivery: {}
        };

        let products = this.getMessageclient_productJsonToObj();

        objDelivery.listaPedidos = products;

        objDelivery.cliente = {
            cliente_nombres: this.getMessageclient_fullname(),
            cliente_apellidos: "",
            cliente_dniruc: 11111111,
            cliente_direccion: this.getMessageclient_address(),
            cliente_email: "",
            cliente_telefono: this.getMessageclient_phone(),
            cliente_tipo: 1,
            validacion_cliente: 4
        }

        objDelivery.delivery = {
            delivery_total: this.getMessageclient_total(),
            delivery_geolocalizacionx: this.getMessageclient_latitude(),
            delivery_geolocalizaciony: this.getMessageclient_longitude(),
            delivery_direccion: this.getMessageclient_address(),
            cambioLocal: false,
            local_id: this.getMessageclient_localid(),
            delivery_costoenvio: this.getMessageclient_costoenvio(),
            delivery_modalidad: this.getMessageclient_methodorder(),
            delivery_pagocon: this.getMessageclient_total(),
            delivery_nombres: this.getMessageclient_fullname(),
            delivery_apellidos: "",
            delivery_email: "",
            delivery_celular: this.getMessageclient_phone(),
            delivery_dniCliente: null,
            delivery_tipopago: this.getMessageclient_tipopago(),
            delivery_tipodepagodescripcion: this.getMessageclient_tipopagoTxt(),
            tipotransferencia_id: "",
            tarjetaglobal_id: "",
            delivery_tipodepago: this.getMessageclient_tipopago(),
            delivery_comprobante: "3",
            esPorMenuOnline: 1
        };

        if (this.getMessageclient_methodorder() == DELIVERY_MODALIDAD_PORRECOGER || this.getMessageclient_methodorder() == DELIVERY_MODALIDAD_PROGRAMADO) {
            objDelivery.delivery.delivery_fechaentrega_recogo = this.getMessageclient_dateorder();
            objDelivery.delivery.delivery_fechaentrega_recogo_formatted = Utility.obtenerFechaConFormato(this.getMessageclient_dateorder(), "d-m-Y H:i:s");
            objDelivery.delivery.delivery_horarecojo = this.getMessageclient_dateorder();
        }

        return objDelivery;
    }

    stepValidateMessageRecive() {
        let stepValidate = null;
        let messageObj = this.getMessageclient_jsonToObj();

        if (
            messageObj.message !== undefined &&
            messageObj.message.payload !== undefined
        ) {
            if (messageObj.message.payload === DELIVERY_MODALIDAD_INMEDIATA && messageObj.message.text === DELIVERY_MODALIDAD_INMEDIATA_TXT) {
                stepValidate = CHATBOOT_STEP_START;
            }
            else if (messageObj.message.payload === DELIVERY_MODALIDAD_PROGRAMADO && messageObj.message.text === DELIVERY_MODALIDAD_PROGRAMADO_TXT) {
                stepValidate = CHATBOOT_STEP_START;
            }
            else if (messageObj.message.payload === DELIVERY_MODALIDAD_PORRECOGER && messageObj.message.text === DELIVERY_MODALIDAD_PORRECOGER_TXT) {
                stepValidate = CHATBOOT_STEP_START;
            }
            else if (messageObj.message.payload === CHOOSE_PRODUCTS && messageObj.message.text === CHOOSE_PRODUCTS_TXT) {
                if (this.getMessageclient_methodorder() === DELIVERY_MODALIDAD_INMEDIATA) {
                    stepValidate = CHATBOOT_STEP_LOCATION;
                }
                else if (this.getMessageclient_methodorder() === DELIVERY_MODALIDAD_PORRECOGER) {
                    stepValidate = CHATBOOT_STEP_RECOJODATE;
                }
                else if (this.getMessageclient_methodorder() === DELIVERY_MODALIDAD_PROGRAMADO) {
                    stepValidate = CHATBOOT_STEP_SCHEDULEDDATE;
                }
            }
            else if (messageObj.message.payload === DELIVERY_UPDATE_ORDER && messageObj.message.text === DELIVERY_UPDATE_ORDER_TXT) {
                stepValidate = CHATBOOT_STEP_SELECTPRODUCT;
            }
            else if (messageObj.message.payload === DELIVERY_CONFIRM_ORDER && messageObj.message.text === DELIVERY_CONFIRM_ORDER_TXT) {
                stepValidate = CHATBOOT_STEP_SELECTPRODUCT;
            }
            /* else if(messageObj.message.payload === DELIVERY_PAYMENT_CE && messageObj.message.text === DELIVERY_PAYMENT_CE_TXT) {
                stepValidate = CHATBOOT_STEP_SELECTPRODUCT;
            }
            else if(messageObj.message.payload === DELIVERY_PAYMENT_CP && messageObj.message.text === DELIVERY_PAYMENT_CP_TXT) {
                stepValidate = CHATBOOT_STEP_SELECTPRODUCT;
            } */
        }

        return stepValidate;
    }
    getStepCurrentAndValidateMessage(currentStep) {
        let responseStatusMessage = null;

        if (currentStep !== CHATBOOT_STEP_CREATEORDER) {
            responseStatusMessage = this.stepValidateMessageRecive();
        }

        if (responseStatusMessage !== null) {
            if (currentStep * 1 > responseStatusMessage) {
                this.clearDataByStep(responseStatusMessage);
            }
        } else {
            responseStatusMessage = currentStep;
        }
        return responseStatusMessage;
    }

    copyAttributesFrom(lastMessage) {

        this.setMessageclient_modelId(lastMessage.getMessageclient_modelId());      
        this.setMessageclient_methodorder(lastMessage.getMessageclient_methodorder());
        this.setMessageclient_phone(lastMessage.getMessageclient_phone());
        this.setMessageclient_fullname(lastMessage.getMessageclient_fullname());
        this.setMessageclient_id(lastMessage.getMessageclient_id());
        this.setMessageclient_latitude(lastMessage.getMessageclient_latitude());
        this.setMessageclient_longitude(lastMessage.getMessageclient_longitude());
        this.setMessageclient_localid(lastMessage.getMessageclient_localid());
        this.setMessageclient_cupon(lastMessage.getMessageclient_cupon());

        this.setMessageclient_costoenvio(lastMessage.getMessageclient_costoenvio());
        this.setMessageclient_costoproductos(lastMessage.getMessageclient_costoproductos());
        this.setMessageclient_descuentocupon(lastMessage.getMessageclient_descuentocupon());
        this.setMessageclient_productjson(lastMessage.getMessageclient_productjson());

        this.setMessageclient_address(lastMessage.getMessageclient_address());
        this.setMessageclient_addressreference(lastMessage.getMessageclient_addressreference());
        this.setMessageclient_total(lastMessage.getMessageclient_total());
        this.setMessageclient_dateorder(lastMessage.getMessageclient_dateorder());
        this.setMessageclient_montominimo(lastMessage.getMessageclient_montominimo());
        this.setMessageclient_tipopago(lastMessage.getMessageclient_tipopago());
        this.setMessageclient_status(ACTIVO);
    }

    clearDataByStep(step) {
        if (step === CHATBOOT_STEP_START) {
            this.setMessageclient_methodorder(null);
            this.setMessageclient_latitude(null);
            this.setMessageclient_longitude(null);
            this.setMessageclient_address(null);
            this.setMessageclient_addressreference(null);
            this.setMessageclient_localid(null);
            this.setMessageclient_dateorder(null);
            this.setMessageclient_montominimo(null);
            this.setMessageclient_costoenvio(null);
            this.setMessageclient_cupon(null);
            this.setMessageclient_descuentocupon(null);
            this.setMessageclient_costoproductos(null);
            this.setMessageclient_productjson(null);
            this.setMessageclient_total(null);
            this.setMessageclient_tipopago(null);
            this.setMessageclient_status(ACTIVO);
        } else if (
            step === CHATBOOT_STEP_LOCATION ||
            step === CHATBOOT_STEP_RECOJODATE ||
            step === CHATBOOT_STEP_SCHEDULEDDATE
        ) {
            this.setMessageclient_cupon(null);
            this.setMessageclient_descuentocupon(null);
            this.setMessageclient_costoproductos(null);
            this.setMessageclient_productjson(null);
            this.setMessageclient_total(null);
            this.setMessageclient_tipopago(null);
            this.setMessageclient_status(ACTIVO);
        } else if (
            step === DELIVERY_UPDATE_ORDER ||
            step === DELIVERY_CONFIRM_ORDER
        ) {
            this.setMessageclient_tipopago(null);
            this.setMessageclient_status(ACTIVO);
        }
    }

    //
    getMessageclient_modelId() {
        return this.messageclient_modelId;
    }

    setMessageclient_modelId(messageclient_modelId) {
        this.messageclient_modelId = messageclient_modelId;
    }

    getMessageclient_id() {
        return this.messageclient_id;
    }
    setMessageclient_id(messageclient_id) {
        this.messageclient_id = messageclient_id;
    }

    getMessageclient_fullname() {
        return this.messageclient_fullname;
    }
    setMessageclient_fullname(messageclient_fullname) {
        this.messageclient_fullname = messageclient_fullname;
    }

    getMessageclient_phone() {
        return this.messageclient_phone;
    }
    setMessageclient_phone(messageclient_phone) {
        this.messageclient_phone = messageclient_phone;
    }

    getMessageclient_message() {
        return this.messageclient_message;
    }
    setMessageclient_message(messageclient_message) {
        this.messageclient_message = messageclient_message;
    }

    getMessageclient_date() {
        return this.messageclient_date;
    }
    setMessageclient_date(messageclient_date) {
        this.messageclient_date = messageclient_date;
    }

    getMessageclient_status() {
        return this.messageclient_status;
    }
    setMessageclient_status(messageclient_status) {
        this.messageclient_status = messageclient_status;
    }

    getMessageclient_textsendwpp() {
        return this.messageclient_textsendwpp;
    }
    setMessageclient_textsendwpp(messageclient_textsendwpp) {
        this.messageclient_textsendwpp = messageclient_textsendwpp;
    }

    getMessageclient_cupon() {
        return this.messageclient_cupon;
    }
    setMessageclient_cupon(messageclient_cupon) {
        this.messageclient_cupon = messageclient_cupon;
    }

    getMessageclient_productjson() {
        return this.messageclient_productjson;
    }
    setMessageclient_productjson(messageclient_productjson) {
        this.messageclient_productjson = messageclient_productjson;
    }

    getMessageclient_json() {
        return this.messageclient_json;
    }
    setMessageclient_json(messageclient_json) {
        this.messageclient_json = messageclient_json;
    }

    getMessageclient_localid() {
        return this.messageclient_localid;
    }
    setMessageclient_localid(messageclient_localid) {
        this.messageclient_localid = messageclient_localid;
    }

    getMessageclient_step() {
        return this.messageclient_step;
    }

    setMessageclient_step(messageclient_step) {
        this.messageclient_step = messageclient_step;
    }

    getMessageclient_methodorder() {
        return this.messageclient_methodorder;
    }
    setMessageclient_methodorder(messageclient_methodorder) {
        this.messageclient_methodorder = messageclient_methodorder;
    }
    getMessageclient_latitude() {
        return this.messageclient_latitude;
    }
    setMessageclient_latitude(messageclient_latitude) {
        this.messageclient_latitude = messageclient_latitude;
    }
    getMessageclient_longitude() {
        return this.messageclient_longitude;
    }
    setMessageclient_longitude(messageclient_longitude) {
        this.messageclient_longitude = messageclient_longitude;
    }

    getMessageclient_costoenvio() {
        return this.messageclient_costoenvio;
    }
    setMessageclient_costoenvio(messageclient_costoenvio) {
        this.messageclient_costoenvio = messageclient_costoenvio;
    }

    getMessageclient_costoproductos() {
        return this.messageclient_costoproductos;
    }
    setMessageclient_costoproductos(messageclient_costoproductos) {
        this.messageclient_costoproductos = messageclient_costoproductos;
    }

    getMessageclient_descuentocupon() {
        return this.messageclient_descuentocupon;
    }
    setMessageclient_descuentocupon(messageclient_descuentocupon) {
        this.messageclient_descuentocupon = messageclient_descuentocupon;
    }

    getMessageclient_address() {
        return this.messageclient_address;
    }
    setMessageclient_address(messageclient_address) {
        this.messageclient_address = messageclient_address;
    }

    getMessageclient_addressreference() {
        return this.messageclient_addressreference;
    }
    setMessageclient_addressreference(messageclient_addressreference) {
        this.messageclient_addressreference = messageclient_addressreference;
    }

    getMessageclient_total() {
        return this.messageclient_total;
    }
    setMessageclient_total(messageclient_total) {
        this.messageclient_total = messageclient_total;
    }

    getMessageclient_tipopago() {
        return this.messageclient_tipopago;
    }
    setMessageclient_tipopago(messageclient_tipopago) {
        this.messageclient_tipopago = messageclient_tipopago;
    }

    getMessageclient_dateorder() {
        return this.messageclient_dateorder;
    }
    setMessageclient_dateorder(messageclient_dateorder) {
        this.messageclient_dateorder = messageclient_dateorder;
    }

    getMessageclient_montominimo() {
        return this.messageclient_montominimo;
    }
    setMessageclient_montominimo(messageclient_montominimo) {
        this.messageclient_montominimo = messageclient_montominimo;
    }

    getMessageclient_cupondescuentojson() {
        return this.messageclient_cupondescuentojson;
    }
    setMessageclient_cupondescuentojson(messageclient_cupondescuentojson) {
        this.messageclient_cupondescuentojson = messageclient_cupondescuentojson;
    }

    getMessageclient_proveedorWhastapp() {
        return this.messageclient_proveedorWhastapp;
    }
    setMessageclient_proveedorWhastapp(messageclient_proveedorWhastapp) {
        this.messageclient_proveedorWhastapp = messageclient_proveedorWhastapp;
    }

    async insert() {
        try {
            const insertData = {};
            if (this.messageclient_id) insertData.messageclient_id = this.messageclient_id;
            if (this.messageclient_phone) insertData.messageclient_phone = this.messageclient_phone;
            if (this.messageclient_message) insertData.messageclient_message = this.messageclient_message;
            if (this.messageclient_json) insertData.messageclient_json = this.messageclient_json;
            if (this.messageclient_localid) insertData.messageclient_localid = this.messageclient_localid;
            if (this.messageclient_step) insertData.messageclient_step = this.messageclient_step;
            if (this.messageclient_methodorder) insertData.messageclient_methodorder = this.messageclient_methodorder;
            if (this.messageclient_latitude) insertData.messageclient_latitude = this.messageclient_latitude;
            if (this.messageclient_longitude) insertData.messageclient_longitude = this.messageclient_longitude;
            if (this.messageclient_clienteid) insertData.messageclient_clienteid = this.messageclient_clienteid;
            if (this.messageclient_fullname) insertData.messageclient_fullname = this.messageclient_fullname;
            if (this.messageclient_date) insertData.messageclient_date = this.messageclient_date;
            if (this.messageclient_status) insertData.messageclient_status = this.messageclient_status;
            if (this.messageclient_textsendwpp) insertData.messageclient_textsendwpp = this.messageclient_textsendwpp;
            if (this.messageclient_cupon) insertData.messageclient_cupon = this.messageclient_cupon;
            if (this.messageclient_productjson) insertData.messageclient_productjson = this.messageclient_productjson;
            if (this.messageclient_costoenvio) insertData.messageclient_costoenvio = this.messageclient_costoenvio;
            if (this.messageclient_costoproductos) insertData.messageclient_costoproductos = this.messageclient_costoproductos;
            if (this.messageclient_descuentocupon) insertData.messageclient_descuentocupon = this.messageclient_descuentocupon;
            if (this.messageclient_address) insertData.messageclient_address = this.messageclient_address;
            if (this.messageclient_addressreference) insertData.messageclient_addressreference = this.messageclient_addressreference;
            if (this.messageclient_total) insertData.messageclient_total = this.messageclient_total;
            if (this.messageclient_tipopago) insertData.messageclient_tipopago = this.messageclient_tipopago;
            if (this.messageclient_dateorder) insertData.messageclient_dateorder = this.messageclient_dateorder;
            if (this.messageclient_montominimo) insertData.messageclient_montominimo = this.messageclient_montominimo;
            if (this.messageclient_cupondescuentojson) insertData.messageclient_cupondescuentojson = this.messageclient_cupondescuentojson;
            if (this.messageclient_proveedorWhastapp) insertData.messageclient_proveedorWhastapp = this.messageclient_proveedorWhastapp;
            const messageClient = new MessageClienteSchema(insertData);
            messageClient.save();
            if (messageClient) {
                return messageClient._id;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async update() {
        try {
          const query = {};
      
          if (this.messageclient_phone) {
            query.messageclient_phone = this.messageclient_phone;
          }
          if (this.messageclient_message) {
            query.messageclient_message = this.messageclient_message;
          }
          if (this.messageclient_json) {
            query.messageclient_json = this.messageclient_json;
          }
          if (this.messageclient_localid) {
            query.messageclient_localid = this.messageclient_localid;
          }
          if (this.messageclient_step) {
            query.messageclient_step = this.messageclient_step;
          }
          if (this.messageclient_methodorder) {
            query.messageclient_methodorder = this.messageclient_methodorder;
          }
          if (this.messageclient_latitude) {
            query.messageclient_latitude = this.messageclient_latitude;
          }
          if (this.messageclient_longitude) {
            query.messageclient_longitude = this.messageclient_longitude;
          }
          if (this.messageclient_clienteid) {
            query.messageclient_clienteid = this.messageclient_clienteid;
          }
          if (this.messageclient_fullname) {
            query.messageclient_fullname = this.messageclient_fullname;
          }
          if (this.messageclient_date) {
            query.messageclient_date = this.messageclient_date;
          }
          if (this.messageclient_status) {
            query.messageclient_status = this.messageclient_status;
          }
          if (this.messageclient_textsendwpp) {
            query.messageclient_textsendwpp = this.messageclient_textsendwpp;
          }
          if (this.messageclient_cupon) {
            query.messageclient_cupon = this.messageclient_cupon;
          }
          if (this.messageclient_productjson) {
            query.messageclient_productjson = this.messageclient_productjson;
          }
          if (this.messageclient_costoenvio) {
            query.messageclient_costoenvio = this.messageclient_costoenvio;
          }
          if (this.messageclient_costoproductos) {
            query.messageclient_costoproductos = this.messageclient_costoproductos;
          }
          if (this.messageclient_descuentocupon) {
            query.messageclient_descuentocupon = this.messageclient_descuentocupon;
          }
          if (this.messageclient_address) {
            query.messageclient_address = this.messageclient_address;
          }
          if (this.messageclient_addressreference) {
            query.messageclient_addressreference = this.messageclient_addressreference;
          }
          if (this.messageclient_total) {
            query.messageclient_total = this.messageclient_total;
          }
          if (this.messageclient_tipopago) {
            query.messageclient_tipopago = this.messageclient_tipopago;
          }
          if (this.messageclient_dateorder) {
            query.messageclient_dateorder = this.messageclient_dateorder;
          }
          if (this.messageclient_montominimo) {
            query.messageclient_montominimo = this.messageclient_montominimo;
          }
          if (this.messageclient_cupondescuentojson) {
            query.messageclient_cupondescuentojson = this.messageclient_cupondescuentojson;
          }
          
          console.log("este es",this.messageclient_modelId)
          const result = await MessageClienteSchema.updateOne(
            { _id: this.messageclient_modelId },
            query
          );

          console.log("sadasdsads",result)
      
          return result.ok === 1;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      
      


}

module.exports = MessageclientModel;
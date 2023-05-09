const MessageclientModel = require('../models/Messageclient'); // Ensure to replace with the correct path to your model
const { SUCCESS, DANGER, CHATBOOT_TYPEMSG_BTN, CHATBOOT_STEP_START, ACTIVO, CHATBOOT_STEP_LOCATION, CHATBOOT_STEP_RECOJODATE, CHATBOOT_STEP_SCHEDULEDDATE, CHOOSE_PRODUCTS, CHOOSE_PRODUCTS_TXT, CHATBOOT_STEP_SELECTPRODUCT, CHATBOOT_TYPEMSG_TEXT, DELIVERY_PAYMENT_CE, DELIVERY_PAYMENT_CE_TXT, DELIVERY_PAYMENT_CP, DELIVERY_PAYMENT_CP_TXT, DELIVERY_MODALIDAD_INMEDIATA, DELIVERY_MODALIDAD_INMEDIATA_TXT, CHATBOOT_STEP_METHODDELIVERY, DELIVERY_MODALIDAD_PROGRAMADO, DELIVERY_MODALIDAD_PROGRAMADO_TXT, DELIVERY_MODALIDAD_PORRECOGER, DELIVERY_MODALIDAD_PORRECOGER_TXT, CHATBOOT_STEP_LINEOUT, CHATBOOT_STEP_SELECTPAYMENT, ERROR, MESSAGE_STEP_DONTPERMISS, DELIVERY_UPDATE_ORDER, DELIVERY_UPDATE_ORDER_TXT, DELIVERY_CONFIRM_ORDER, DELIVERY_CONFIRM_ORDER_TXT, TYPE_TEMPLATE, TYPE_MESSAGE_META_SEND_TEXT, TYPE_MESSAGE_META_SEND_TEMPLATE, DELIVERY_MODALIDAD_INMEDIATA_META, DELIVERY_MODALIDAD_INMEDIATA_TXT_META, TYPE_MESSAGE_META_SEND_INTERACTIVE, DELIVERY_MODALIDAD_PROGRAMADO_TXT_META, DELIVERY_MODALIDAD_PORRECOGER_TXT_META, PROVEEDOR_META, PROVEEDOR_MAYTAPI, TYPE_MESSAGE_META_RECIVE_TEXT, DELIVERY_UPDATE_ORDER_TXT_META, DELIVERY_CONFIRM_ORDER_TXT_META, DELIVERY_PAYMENT_CE_TXT_META, DELIVERY_PAYMENT_CP_TXT_META, CHATBOOT_STEP_CREATEORDER } = require('../config/constants');
const Utility = require('../services/utility.services');
const Security = require('../services/security.services');
// const Maytapi = require('../services/maytapi.service');
const Establishment = require('../services/establishment.services');
const MetaApi = require('../services/metapi.services');


const addMessageFromWebHoookMeta = async (messageComplete) => {
    // recibo el mensaje completo
    // iniciamos la clase del mensaje
    let data = {};
    let mensajes = [];
    let tipo = SUCCESS;
    let datos = '';
    let logs = [];
    let obj = new MessageclientModel();
    console.log("Aca empezamos controller")
    // seteamos la propiedades de messageclient segun el messagecomplete
    obj.setMessageclient_json( messageComplete);
    messageComplete.entry
        ?obj.setMessageclient_proveedorWhastapp(PROVEEDOR_META)
        :obj.setMessageclient_proveedorWhastapp(PROVEEDOR_MAYTAPI);
    if (!obj.mensajeValidoMeta()) {
        // Utility.logs.push('No es un mensaje valido.');
        mensajes.push('No es un mensaje valido.');
    }
    console.log("mensajes.length", mensajes.length)
    if (mensajes.length === 0) {
        // Obtengo el ultimo mensaje con respecto al numero
        let lastMessage = await obj.getLastMessageByPhone();
        console.log("lastMessage", lastMessage)
        // Existe 1er mensaje
        if (lastMessage !== null && !obj.esMessageReset()) {
            console.log("existe 1er mensaje")
            let isUpdate = true;
            // fn para obtener las propiedades del ultimo mensaje
            obj.copyAttributesFrom(lastMessage);

            // obtener el step del ultimo mensaje y si no hay asignarle el step inicial(0)
            let step = lastMessage.getMessageclient_step() !== null ? lastMessage.getMessageclient_step() : CHATBOOT_STEP_START;
            if (step !== CHATBOOT_STEP_START) {
                step = obj.getStepCurrentAndValidateMessage(step);
            }
            console.log("step", step)
            let objMessageStep = null;
            let typeMessageToSend = TYPE_MESSAGE_META_SEND_INTERACTIVE;
            let stepNext = CHATBOOT_STEP_START;
            let messageObj = obj.getMessageclient_jsonToObjMeta();
            console.log("messageObjxxxxxxxxxxxxxxx", messageObj)
            if (obj.estaDentroDeltiempo(lastMessage.getMessageclient_date()) && !obj.esMessageReset()) {

                switch (step) {
                    case CHATBOOT_STEP_START:
                        console.log("aca empiezo ")
                        console.log(messageObj.type)
                        if (messageObj.type && messageObj.interactive.type) {
                            console.log("no pase la validacion de chatboot start")
                            if (
                                messageObj.interactive.type.button_reply.id == DELIVERY_MODALIDAD_INMEDIATA &&
                                messageObj.interactive.type.title == DELIVERY_MODALIDAD_INMEDIATA_TXT_META
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepDeliveryInmediatoMeta(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname()
                                );
                                obj.setMessageclient_methodorder(DELIVERY_MODALIDAD_INMEDIATA);
                                stepNext = CHATBOOT_STEP_METHODDELIVERY;
                                typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                            }
                            else if (
                                 messageObj.button.payload == DELIVERY_MODALIDAD_PROGRAMADO &&
                                messageObj.button.text == DELIVERY_MODALIDAD_PROGRAMADO_TXT_META
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepDeliveryProgramadoMeta(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname()
                                );
                                obj.setMessageclient_methodorder(DELIVERY_MODALIDAD_PROGRAMADO);
                                stepNext = CHATBOOT_STEP_METHODDELIVERY;
                                typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                            } else if (
                                 messageObj.button.payload == DELIVERY_MODALIDAD_PORRECOGER &&
                                messageObj.button.text == DELIVERY_MODALIDAD_PORRECOGER_TXT_META
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepDeliveryRecojoTiendaMeta(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname()
                                );
                                obj.setMessageclient_methodorder(DELIVERY_MODALIDAD_PORRECOGER);
                                stepNext = CHATBOOT_STEP_METHODDELIVERY;
                                typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                            }
                        }
                        break;

                    case CHATBOOT_STEP_LOCATION:// No se utiliza
                    case CHATBOOT_STEP_RECOJODATE:
                        console.log("entre a recojodate")
                    case CHATBOOT_STEP_SCHEDULEDDATE:
                        console.log("entre a CHATBOOT_STEP_SCHEDULEDDATE")
                        console.log(messageObj)

                        // Validar el cupón aquí
                        if (
                             messageObj.button.payload &&
                             messageObj.button.payload == CHOOSE_PRODUCTS &&
                             messageObj.button.text == CHOOSE_PRODUCTS_TXT
                        ) {
                            obj.setMessageclient_cupon("");
                        } else if (messageObj.type == TYPE_MESSAGE_META_RECIVE_TEXT) {
                            obj.setMessageclient_cupon(messageObj.message.text);
                        }
                        objMessageStep = await MessageclientModel.getMessageStepFourMeta(
                            obj.getMessageclient_phone(),
                            obj.getMessageclient_fullname(),
                            obj.getMessageclient_localid()
                        );
                        stepNext = CHATBOOT_STEP_SELECTPRODUCT;
                        typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                        break;

                    case CHATBOOT_STEP_SELECTPRODUCT:
                        // Crear la orden aquí
                        objMessageStep = await MessageclientModel.getMessageStepConfirmOrderOrUpdateProducts(
                            obj.getMessageclient_phone(),
                            obj.getMessageclient_productjson(),
                            obj.getMessageclient_total(),
                            obj.getMessageclient_methodorderTxt(),
                            obj.getMessageclient_fullname(),
                            obj.getMessageclient_address(),
                            obj.getMessageclient_costoenvio(),
                            obj.getMessageclient_dateorder()
                        );
                        stepNext = CHATBOOT_STEP_SELECTPRODUCT;
                        typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                        if (messageObj.button && messageObj.button.payload) {
                            if (
                                messageObj.button.payload == DELIVERY_UPDATE_ORDER &&
                                messageObj.button.text == DELIVERY_UPDATE_ORDER_TXT_META
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepFourMeta(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname(),
                                    obj.getMessageclient_localid()
                                );
                                stepNext = CHATBOOT_STEP_SELECTPRODUCT;
                                typeMessageToSend = CHATBOOT_TYPEMSG_TEXT;
                            } else if (
                                messageObj.button.payload == DELIVERY_CONFIRM_ORDER &&
                                messageObj.button.text == DELIVERY_CONFIRM_ORDER_TXT_META
                            ) {
                                // create order by crud
                                objMessageStep = MessageclientModel.getMessageStepConfirmTypePaymentMeta(
                                    obj.getMessageclient_phone()
                                );
                                stepNext = CHATBOOT_STEP_SELECTPAYMENT;
                                typeMessageToSend = TYPE_MESSAGE_META_SEND_INTERACTIVE;
                            }
                        }
                        break;

                    case CHATBOOT_STEP_SELECTPAYMENT:
                        // aca se crea la orden
                        objMessageStep = await MessageclientModel.getMessageStepConfirmTypePaymentMeta(
                            obj.getMessageclient_phone()
                        );
                        stepNext = CHATBOOT_STEP_SELECTPAYMENT;
                        typeMessageToSend = TYPE_MESSAGE_META_SEND_INTERACTIVE;
                        if (messageObj.button && messageObj.button.payload) {

                            if (
                                (messageObj.button.payload == DELIVERY_PAYMENT_CE &&
                                    messageObj.button.text == DELIVERY_PAYMENT_CE_TXT_META) ||
                                (messageObj.button.payload == DELIVERY_PAYMENT_CP &&
                                    messageObj.button.text == DELIVERY_PAYMENT_CP_TXT_META)
                            ) {

                                obj.setMessageclient_tipopago(messageObj.button.payload);
                                let products = obj.getMessageclient_productJsonToObj();
                                if (products && Array.isArray(products) && products.length > 0) {
                                    // create order
                                    let orderObj = obj.createOrderObj();
                                    let url =    Utility.urlAgregarDelivery()
                                        console.log(url)
                                    Utility.logs.push(url);
                                    let curlOrderInstance = await Utility.peticionPublica(
                                        url,
                                        'POST',
                                        orderObj
                                    );
                                    Utility.logs.push(curlOrderInstance);
                                    if (
                                        curlOrderInstance.tipo &&
                                        curlOrderInstance.data &&
                                        curlOrderInstance.tipo == SUCCESS
                                    ) {
                                        if (obj.getMessageclient_methodorder() == DELIVERY_MODALIDAD_PORRECOGER) {
                                            objMessageStep = await MessageclientModel.getMessageStepOrderRecojoTiendaMeta(
                                                obj.getMessageclient_phone(),
                                                curlOrderInstance.data,
                                                obj.getMessageclient_dateorder()
                                            );
                                        } else {

                                            objMessageStep = await MessageclientModel.getMessageStepOrderSeguimientoMeta(
                                                obj.getMessageclient_phone(),
                                                curlOrderInstance.data
                                            );
                                        }
                                        stepNext = CHATBOOT_STEP_CREATEORDER;
                                        typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                                    }
                                    data.orderObj = orderObj;
                                }
                            }
                        }
                        break;
                }
            }
            // console.log("objMessageStep" , objMessageStep)
            if (objMessageStep == null) {
                console.log("entre por aca xq estoy en step 7")
                objMessageStep = await MessageclientModel.getMessageStepOneMeta();
                if (objMessageStep.buttons.length == 0) {
                    stepNext = CHATBOOT_STEP_LINEOUT;
                    typeMessageToSend = TYPE_MESSAGE_META_SEND_INTERACTIVE;
                    objMessageStep = "Por el momento no tenemos disponible delivery, intentalo mas tarde";
                }
                obj.clearAttr();
                isUpdate = false;
            }
            obj.setMessageclient_step(stepNext);
            obj.setMessageclient_date(Utility.getFechaHoraActual());
            obj.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
            if (isUpdate == true) {

                datos = await obj.update();
            } 
            Utility.logs.push(objMessageStep);
            Utility.logs.push(await MetaApi.enviarWhatsAppPorApiOficial(obj.getMessageclient_phone(), typeMessageToSend , objMessageStep.message , objMessageStep.buttons, ""));
            mensajes.push('Mensaje enviado exitosamente.');

        } else { // send the message to start the conversation
            console.log("entre a  caso donde no hay mensajes")

            // if(!obj.validarInicioChat() && !obj.esMessageReset()){
                if(false){

                console.log("No es un mensaje valido , iniciar chat con Pedir.")
                Utility.logs.push('No es un mensaje valido , iniciar chat con Pedir.');
                mensajes.push('No es un mensaje valido,  iniciar chat con Pedir.');
            } else {
            // Check if I have the client registered in the instance
            console.log("pase la validacion de inicio de chat")
            typeMessageToSend = TYPE_MESSAGE_META_SEND_INTERACTIVE;
            stepNext = CHATBOOT_STEP_START;
            let curlClienteInstance = await Utility.peticionPublica("http://" + Security.getSubdomain() + "." + Security.getDominio() + "/restaurant/m/rest/cliente/clienteByPropertyAndValue/cliente_telefono/" + obj.getMessageclient_phone(), "GET");
            obj.setMessageclient_status(ACTIVO);
            obj.setMessageclient_fullname("");
            if (
                curlClienteInstance.tipo &&
                curlClienteInstance.data &&
                curlClienteInstance.tipo == SUCCESS
            ) {
                let clientObj = curlClienteInstance.data;
                obj.setMessageclient_id(clientObj.cliente_id);
                obj.setMessageclient_fullname(clientObj.cliente_nombres);
            }
            let objMessageStep = await MessageclientModel.getMessageStepOneMeta();
            obj.setMessageclient_date(Utility.getFechaHoraActual());
            if (objMessageStep.buttons.length == 0) {
                stepNext = CHATBOOT_STEP_LINEOUT;
                typeMessageToSend = TYPE_MESSAGE_META_SEND_TEXT;
                objMessageStep.message = "Por el momento no tenemos disponible delivery, intentalo mas tarde";
            }
            obj.setMessageclient_step(stepNext);
            obj.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
            datos = await obj.insert();

            Utility.logs.push(await MetaApi.enviarWhatsAppPorApiOficial(obj.getMessageclient_phone(),typeMessageToSend , objMessageStep.message , objMessageStep.buttons, ""));
            mensajes.push('Mensaje enviado exitosamente.');
            }

        }
    }

    data.mensajes = mensajes;
    data.tipo = tipo;
    data.data = datos;
    data.logs = Utility.logs;
    return data;

}


module.exports = { addMessageFromWebHoookMeta  }
const MessageclientModel = require('../models/Messageclient'); // Ensure to replace with the correct path to your model
const { SUCCESS, DANGER, CHATBOOT_TYPEMSG_BTN, CHATBOOT_STEP_START, ACTIVO, CHATBOOT_STEP_LOCATION, CHATBOOT_STEP_RECOJODATE, CHATBOOT_STEP_SCHEDULEDDATE, CHOOSE_PRODUCTS, CHOOSE_PRODUCTS_TXT, CHATBOOT_STEP_SELECTPRODUCT, CHATBOOT_TYPEMSG_TEXT, DELIVERY_PAYMENT_CE, DELIVERY_PAYMENT_CE_TXT, DELIVERY_PAYMENT_CP, DELIVERY_PAYMENT_CP_TXT, DELIVERY_MODALIDAD_INMEDIATA, DELIVERY_MODALIDAD_INMEDIATA_TXT, CHATBOOT_STEP_METHODDELIVERY, DELIVERY_MODALIDAD_PROGRAMADO, DELIVERY_MODALIDAD_PROGRAMADO_TXT, DELIVERY_MODALIDAD_PORRECOGER, DELIVERY_MODALIDAD_PORRECOGER_TXT, CHATBOOT_STEP_LINEOUT, CHATBOOT_STEP_SELECTPAYMENT, ERROR, MESSAGE_STEP_DONTPERMISS, DELIVERY_UPDATE_ORDER, DELIVERY_UPDATE_ORDER_TXT, DELIVERY_CONFIRM_ORDER, DELIVERY_CONFIRM_ORDER_TXT } = require('../config/constants');
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

    console.log("messageComplete",messageComplete)
    // if (!obj.mensajeValido()) {
    //     // Utility.logs.push('No es un mensaje valido.');
    //     mensajes.push('No es un mensaje valido.');
    // }
    console.log("mensajes.length", mensajes.length)
    if (mensajes.length === 0) {
        // Obtengo el ultimo mensaje con respecto al numero
        let lastMessage = await obj.getLastMessageByPhone();
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
            let typeMessage = CHATBOOT_TYPEMSG_BTN;
            let stepNext = CHATBOOT_STEP_START;
            let messageObj = obj.getMessageclient_jsonToObj();
            if (obj.estaDentroDeltiempo(lastMessage.getMessageclient_date()) && !obj.esMessageReset()) {

                switch (step) {
                    case CHATBOOT_STEP_START:
                        console.log("aca empiezo ")
                        if (messageObj.message && messageObj.message.payload) {
                            if (
                                messageObj.message.payload == DELIVERY_MODALIDAD_INMEDIATA &&
                                messageObj.message.text == DELIVERY_MODALIDAD_INMEDIATA_TXT
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepDeliveryInmediato(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname()
                                );
                                obj.setMessageclient_methodorder(DELIVERY_MODALIDAD_INMEDIATA);
                                stepNext = CHATBOOT_STEP_METHODDELIVERY;
                                typeMessage = CHATBOOT_TYPEMSG_TEXT;
                            }
                            else if (
                                messageObj.message.payload == DELIVERY_MODALIDAD_PROGRAMADO &&
                                messageObj.message.text == DELIVERY_MODALIDAD_PROGRAMADO_TXT
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepDeliveryProgramado(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname()
                                );
                                obj.setMessageclient_methodorder(DELIVERY_MODALIDAD_PROGRAMADO);
                                stepNext = CHATBOOT_STEP_METHODDELIVERY;
                                typeMessage = CHATBOOT_TYPEMSG_TEXT;
                            } else if (
                                messageObj.message.payload == DELIVERY_MODALIDAD_PORRECOGER &&
                                messageObj.message.text == DELIVERY_MODALIDAD_PORRECOGER_TXT
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepDeliveryRecojoTienda(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname()
                                );
                                obj.setMessageclient_methodorder(DELIVERY_MODALIDAD_PORRECOGER);
                                stepNext = CHATBOOT_STEP_METHODDELIVERY;
                                typeMessage = CHATBOOT_TYPEMSG_TEXT;
                            }
                        }
                        break;

                    case CHATBOOT_STEP_LOCATION:// No se utiliza
                    case CHATBOOT_STEP_RECOJODATE:
                    case CHATBOOT_STEP_SCHEDULEDDATE:
                        // Validar el cupón aquí
                        if (
                            messageObj.message.payload &&
                            messageObj.message.payload == CHOOSE_PRODUCTS &&
                            messageObj.message.text == CHOOSE_PRODUCTS_TXT
                        ) {
                            obj.setMessageclient_cupon("");
                        } else if (messageObj.message.text) {
                            obj.setMessageclient_cupon(messageObj.message.text);
                        }
                        objMessageStep = await MessageclientModel.getMessageStepFour(
                            obj.getMessageclient_phone(),
                            obj.getMessageclient_fullname(),
                            obj.getMessageclient_localid()
                        );
                        stepNext = CHATBOOT_STEP_SELECTPRODUCT;
                        typeMessage = CHATBOOT_TYPEMSG_TEXT;
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
                        typeMessage = CHATBOOT_TYPEMSG_BTN;
                        if (messageObj.message && messageObj.message.payload) {
                            if (
                                messageObj.message.payload == DELIVERY_UPDATE_ORDER &&
                                messageObj.message.text == DELIVERY_UPDATE_ORDER_TXT
                            ) {
                                objMessageStep = await MessageclientModel.getMessageStepFour(
                                    obj.getMessageclient_phone(),
                                    obj.getMessageclient_fullname(),
                                    obj.getMessageclient_localid()
                                );
                                stepNext = CHATBOOT_STEP_SELECTPRODUCT;
                                typeMessage = CHATBOOT_TYPEMSG_TEXT;
                            } else if (
                                messageObj.message.payload == DELIVERY_CONFIRM_ORDER &&
                                messageObj.message.text == DELIVERY_CONFIRM_ORDER_TXT
                            ) {
                                // create order by crud
                                objMessageStep = MessageclientModel.getMessageStepConfirmTypePayment(
                                    obj.getMessageclient_phone()
                                );
                                stepNext = CHATBOOT_STEP_SELECTPAYMENT;
                                typeMessage = CHATBOOT_TYPEMSG_BTN;
                            }
                        }
                        break;

                    case CHATBOOT_STEP_SELECTPAYMENT:
                        // aca se crea la orden
                        objMessageStep = await MessageclientModel.getMessageStepConfirmTypePayment(
                            obj.getMessageclient_phone()
                        );
                        stepNext = CHATBOOT_STEP_SELECTPAYMENT;
                        typeMessage = CHATBOOT_TYPEMSG_BTN;
                        if (messageObj.message && messageObj.message.payload) {
                            if (
                                (messageObj.message.payload == DELIVERY_PAYMENT_CE &&
                                    messageObj.message.text == DELIVERY_PAYMENT_CE_TXT) ||
                                (messageObj.message.payload == DELIVERY_PAYMENT_CP &&
                                    messageObj.message.text == DELIVERY_PAYMENT_CP_TXT)
                            ) {
                                obj.setMessageclient_tipopago(messageObj.message.payload);
                                let products = obj.getMessageclient_productJsonToObj();

                                if (products && Array.isArray(products) && products.length > 0) {
                                    // create order
                                    let orderObj = obj.createOrderObj();
                                    let url =
                                        'http://' +
                                        Security.getSubdomain() +
                                        '.' +
                                        Security.getDominio() +
                                        '/restaurant/facebook/rest/delivery/agregarDeliveryPorIntegracion';
                                    Utility.logs.push(url);
                                    let curlOrderInstance = Utility.peticionPublica(
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
                                            objMessageStep = MessageclientModel.getMessageStepOrderRecojoTienda(
                                                obj.getMessageclient_phone(),
                                                curlOrderInstance.data,
                                                obj.getMessageclient_dateorder()
                                            );
                                        } else {
                                            objMessageStep = MessageClient.getMessageStepOrderSeguimiento(
                                                obj.getMessageclient_phone(),
                                                curlOrderInstance.data
                                            );
                                        }
                                        stepNext = CHATBOOT_STEP_CREATEORDER;
                                        typeMessage = CHATBOOT_TYPEMSG_TEXT;
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
                objMessageStep = await MessageclientModel.getMessageStepOne(obj.getMessageclient_phone(), obj.getMessageclient_fullname());
                if (objMessageStep.buttons.length == 0) {
                    stepNext = CHATBOOT_STEP_LINEOUT;
                    typeMessage = CHATBOOT_TYPEMSG_TEXT;
                    objMessageStep = "Por el momento no tenemos disponible delivery, intentalo mas tarde";
                }
                obj.clearAttr();
                isUpdate = false;
            }
            obj.setMessageclient_step(stepNext);
            obj.setMessageclient_date(Utility.getFechaHoraActual());
            obj.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
            if (isUpdate == true) {
                // console.log('update');
                // obj.setMessageclient_id(lastMessage.getMessageclient_id());
                // console.log("este es",obj)
                datos = await obj.update();
            } else {
                // obj.setMessageclient_id(null);
                // datos = await obj.insert();
            }
            Utility.logs.push(objMessageStep);
            Utility.logs.push(await Maytapi.enviarMensajePorWhatsapp(objMessageStep, obj.getMessageclient_phone(), typeMessage));
            mensajes.push('Mensaje enviado exitosamente.');

        } else { // send the message to start the conversation

            if(!obj.validarInicioChat() && !obj.esMessageReset()){
                console.log("No es un mensaje valido , iniciar chat con Pedir.")
                Utility.logs.push('No es un mensaje valido , iniciar chat con Pedir.');
                mensajes.push('No es un mensaje valido,  iniciar chat con Pedir.');
            } else {
            // Check if I have the client registered in the instance
            console.log("entre a 1er mensaje")
            typeMessage = TYPE_TEMPLATE;
            stepNext = CHATBOOT_STEP_START;
            let curlClienteInstance = await Utility.peticionPublica("http://" + Security.getSubdomain() + "." + Security.getDominio() + "/restaurant/m/rest/cliente/clienteByPropertyAndValue/cliente_telefono/" + obj.getMessageclient_phone(), "GET");
            // console.log(curlClienteInstance)
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
            let objMessageStepOne = await MessageclientModel.getTemplateStepOne();
            obj.setMessageclient_date(Utility.getFechaHoraActual());
            if (objMessageStepOne.buttons.length == 0) {
                stepNext = CHATBOOT_STEP_LINEOUT;
                typeMessage = CHATBOOT_TYPEMSG_TEXT;
                objMessageStepOne = "Por el momento no tenemos disponible delivery, intentalo mas tarde";
            }
            obj.setMessageclient_step(stepNext);
            obj.setMessageclient_textsendwpp(JSON.stringify(objMessageStepOne));
            // console.log("antes de datos")
            datos = await obj.insert();
            // console.log("despues de datos")

            Utility.logs.push(await MetaApi.enviarWhatsAppPorApiOficial(obj.getMessageclient_phone(),"" , typeMessage , "", objMessageStepOne.templateName));
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
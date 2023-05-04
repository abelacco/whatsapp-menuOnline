const MessageclientModel = require('../models/Messageclient'); // Ensure to replace with the correct path to your model
// const MessageclientStore = require('../store/messagecliente.store'); // Ensure to replace with the correct path to your store
const { SUCCESS, DANGER, CHATBOOT_TYPEMSG_BTN, CHATBOOT_STEP_START, ACTIVO, CHATBOOT_STEP_LOCATION, CHATBOOT_STEP_RECOJODATE, CHATBOOT_STEP_SCHEDULEDDATE, CHOOSE_PRODUCTS, CHOOSE_PRODUCTS_TXT, CHATBOOT_STEP_SELECTPRODUCT, CHATBOOT_TYPEMSG_TEXT, DELIVERY_PAYMENT_CE, DELIVERY_PAYMENT_CE_TXT, DELIVERY_PAYMENT_CP, DELIVERY_PAYMENT_CP_TXT, DELIVERY_MODALIDAD_INMEDIATA, DELIVERY_MODALIDAD_INMEDIATA_TXT, CHATBOOT_STEP_METHODDELIVERY, DELIVERY_MODALIDAD_PROGRAMADO, DELIVERY_MODALIDAD_PROGRAMADO_TXT, DELIVERY_MODALIDAD_PORRECOGER, DELIVERY_MODALIDAD_PORRECOGER_TXT, CHATBOOT_STEP_LINEOUT, CHATBOOT_STEP_SELECTPAYMENT, ERROR, MESSAGE_STEP_DONTPERMISS, DELIVERY_UPDATE_ORDER, DELIVERY_UPDATE_ORDER_TXT, DELIVERY_CONFIRM_ORDER, DELIVERY_CONFIRM_ORDER_TXT } = require('../config/constants');
const Utility = require('../services/utility.services');
const Security = require('../services/security.services');
const Maytapi = require('../services/maytapi.service');
const Establishment = require('../services/establishment.services');


const add = async (req, res) => {
    // try {
    //     let result = MessageclientStore.insert(req.body);
    //     // let result = await obj.save();

    //     if (result) {
    //         res.status(200).json({ type: SUCCESS, message: "Se agregó con éxito.", data: result });
    //     } else {
    //         res.status(500).json({ type: DANGER , message: "Se produjo un error al crear. Inténtalo de nuevo." });
    //     }
    // } catch (error) {
    //     res.status(500).json({ type: DANGER, message: "Se produjo un error al crear. Inténtalo de nuevo.", error: error });
    // }
}

const update = async (req, res) => {
    try {
        let result = await Messageclient.findByIdAndUpdate(req.body._id, req.body, { new: true });

        if (result) {
            res.status(200).json({ type: "SUCCESS", message: "Se actualizó con éxito.", data: result });
        } else {
            res.status(500).json({ type: "DANGER", message: "Se produjo un error al modificar. Inténtalo de nuevo." });
        }
    } catch (error) {
        res.status(500).json({ type: "DANGER", message: "Se produjo un error al modificar. Inténtalo de nuevo.", error: error });
    }
}

const getById = async (req, res) => {
    try {
        let result = await Messageclient.findById(req.params.id);

        if (result) {
            res.status(200).json({ type: "SUCCESS", data: result });
        } else {
            res.status(404).json({ type: "DANGER", message: "Error, Valor no Encontrado" });
        }
    } catch (error) {
        res.status(500).json({ type: "DANGER", message: "Error, Valor no Encontrado", error: error });
    }
}

const deleteById = async (req, res) => {
    try {
        let result = await Messageclient.findByIdAndDelete(req.params.id);

        if (result) {
            res.status(200).json({ type: "SUCCESS", message: "Se eliminó con éxito." });
        } else {
            res.status(404).json({ type: "DANGER", message: "Error, Valor no Encontrado" });
        }
    } catch (error) {
        res.status(500).json({ type: "DANGER", message: "Error, Valor no Encontrado", error: error });
    }
}

const listByPagination = async (req, res) => {
    const pagina = parseInt(req.query.pagina);
    const registros = parseInt(req.query.registros);
    try {
        const array_salida = await Messageclient.find().skip((pagina - 1) * registros).limit(registros);
        const totalCount = await Messageclient.countDocuments();
        res.status(200).json({ lista: array_salida, totalCount: totalCount });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos', error: error });
    }
}

const getAllActive = async (req, res) => {
    try {
        const array_salida = await Messageclient.find({ messageclient_estado: '1' });
        res.status(200).json(array_salida);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos', error: error });
    }
}


const addMessageFromWebHoook = async (messageComplete) => {
    // recibo el mensaje completo
    // iniciamos la clase del mensaje
    let data = {};
    let mensajes = [];
    let tipo = SUCCESS;
    let datos = '';
    let logs = [];
    let obj = new MessageclientModel();

    // seteamos la propiedades de messageclient segun el messagecomplete
    obj.setMessageclient_json(messageComplete);


    if (!obj.mensajeValido()) {
        mensajes.push('No es un mensaje valido.');
    }

    if (mensajes.length === 0) {
        // Obtengo el ultimo mensaje con respecto al numero
        let lastMessage = await obj.getLastMessageByPhone();

        // Existe 1er mensaje
        if (lastMessage !== null && !obj.esMessageReset()) {
            let isUpdate = true;
            obj.setMessageclient_methodorder(lastMessage.getMessageclient_methodorder());
            obj.setMessageclient_phone(lastMessage.getMessageclient_phone());
            obj.setMessageclient_fullname(lastMessage.getMessageclient_fullname());
            obj.setMessageclient_id(lastMessage.getMessageclient_id());
            obj.setMessageclient_latitude(lastMessage.getMessageclient_latitude());
            obj.setMessageclient_longitude(lastMessage.getMessageclient_longitude());
            obj.setMessageclient_localid(lastMessage.getMessageclient_localid());
            obj.setMessageclient_cupon(lastMessage.getMessageclient_cupon());

            obj.setMessageclient_costoenvio(lastMessage.getMessageclient_costoenvio());
            obj.setMessageclient_costoproductos(lastMessage.getMessageclient_costoproductos());
            obj.setMessageclient_descuentocupon(lastMessage.getMessageclient_descuentocupon());
            obj.setMessageclient_productjson(lastMessage.getMessageclient_productjson());

            obj.setMessageclient_address(lastMessage.getMessageclient_address());
            obj.setMessageclient_addressreference(lastMessage.getMessageclient_addressreference());
            obj.setMessageclient_total(lastMessage.getMessageclient_total());
            obj.setMessageclient_dateorder(lastMessage.getMessageclient_dateorder());
            obj.setMessageclient_montominimo(lastMessage.getMessageclient_montominimo());
            obj.setMessageclient_tipopago(lastMessage.getMessageclient_tipopago());
            obj.setMessageclient_status(ACTIVO);
            let step = lastMessage.getMessageclient_step() !== null ? lastMessage.getMessageclient_step() : CHATBOOT_STEP_START;
            if (step !== CHATBOOT_STEP_START) {
                step = obj.getStepCurrentAndValidateMessage(step);
            }

            let objMessageStep = null;
            let typeMessage = CHATBOOT_TYPEMSG_BTN;
            let stepNext = CHATBOOT_STEP_START;
            let messageObj = obj.getMessageclient_jsonToObj();
            if (obj.estaDentroDeltiempo(lastMessage.getMessageclient_date()) && !obj.esMessageReset()) {

                switch (step) {
                    case CHATBOOT_STEP_START:
                        console.log("aca empiezo ")
                        if (
                            messageObj.message &&
                            messageObj.message.payload
                        ) {
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

                    case CHATBOOT_STEP_LOCATION:
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
                obj.setMessageclient_id(lastMessage.getMessageclient_id());
                datos = await obj.update();
            } else {
                obj.setMessageclient_id(null);
                datos = await obj.insert();
            }
            Utility.logs.push(objMessageStep);
            Utility.logs.push(await Maytapi.enviarMensajePorWhatsapp(objMessageStep, obj.getMessageclient_phone(), typeMessage));
            mensajes.push('Mensaje enviado exitosamente.');

        } else { // send the message to start the conversation

            // Check if I have the client registered in the instance
            typeMessage = CHATBOOT_TYPEMSG_BTN;
            stepNext = CHATBOOT_STEP_START;
            let curlClienteInstance = await Utility.peticionPublica("http://" + Security.getSubdomain() + "." + Security.getDominio() + "/restaurant/m/rest/cliente/clienteByPropertyAndValue/cliente_telefono/" + obj.getMessageclient_phone(), "GET");
            console.log(curlClienteInstance)
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
            let objMessageStepOne = await MessageclientModel.getMessageStepOne(obj.getMessageclient_phone(), obj.getMessageclient_fullname());
            console.log("objMessageStepOne", objMessageStepOne)
            obj.setMessageclient_date(Utility.getFechaHoraActual());
            if (objMessageStepOne.buttons.length == 0) {
                stepNext = CHATBOOT_STEP_LINEOUT;
                typeMessage = CHATBOOT_TYPEMSG_TEXT;
                objMessageStepOne = "Por el momento no tenemos disponible delivery, intentalo mas tarde";
            }
            obj.setMessageclient_step(stepNext);
            obj.setMessageclient_textsendwpp(JSON.stringify(objMessageStepOne));
            datos = await obj.insert();
            Utility.logs.push(await Maytapi.enviarMensajePorWhatsapp(objMessageStepOne, obj.getMessageclient_phone(), typeMessage));
            mensajes.push('Mensaje enviado exitosamente.');
        }

        data.mensajes = mensajes;
        data.tipo = tipo;
        data.data = datos;
        data.logs = Utility.logs;
        return data;


    }
}

async function messageLatLngDateClient(objParametros) {

    let data = {};
    let mensajes = [];
    let tipo = SUCCESS;
    let datos = null;
    let timeOperation = [];
    timeOperation.push("Inicio proceso: " + Utility.getFechaActualConMilisegundos());
    let messageClient = new MessageclientModel();
    messageClient.setMessageclient_phone(objParametros.phone);
    let lastMessage = await messageClient.getLastMessageByPhone();

    if (!objParametros.hasOwnProperty('address_latitude') || !objParametros.hasOwnProperty('address_longitude')) {
        tipo = ERROR;
        mensajes.push("Ingrese coordenadas validas.");
    }

    if (!objParametros.hasOwnProperty('address_textmap')) {
        tipo = ERROR;
        mensajes.push("Ingrese un texto de direccion valido.");
    }

    if (!objParametros.hasOwnProperty('phone')) {
        tipo = ERROR;
        mensajes.push("Ingrese un telefono valido.");
    }
    if (lastMessage != null && lastMessage.getMessageclient_step() == CHATBOOT_STEP_METHODDELIVERY && lastMessage.getMessageclient_methodorder() != null) 
    {
        let objGeo = {
            latitude: objParametros.address_latitude,
            longitude: objParametros.address_longitude,
            address: objParametros.address_textmap,
            addressreference: objParametros?.addressreference,
        };
        // Verify store availability based on address
        if (lastMessage.getMessageclient_methodorder() == DELIVERY_MODALIDAD_INMEDIATA) {

            // let messageClient = Object.assign({}, lastMessage);
            let objMessageStep = MessageclientModel.getMessageStepThreev3(
                objParametros.local_nombrecomercial,
                objParametros.messageclient_costoenvio,
                objParametros.messageclient_montominimo
            );
            messageClient.setMessageclient_status(ACTIVO);
            messageClient.setMessageclient_step(CHATBOOT_STEP_LOCATION);
            messageClient.setMessageclient_date(Utility.getFechaHoraActual());
            messageClient.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
            messageClient.setMessageclient_latitude(objGeo.latitude);
            messageClient.setMessageclient_longitude(objGeo.longitude);
            messageClient.setMessageclient_localid(objParametros.messageclient_localid);
            messageClient.setMessageclient_costoenvio(objParametros.messageclient_costoenvio);
            messageClient.setMessageclient_address(objGeo.address);
            messageClient.setMessageclient_addressreference(objGeo.addressreference);
            messageClient.setMessageclient_montominimo(objParametros.messageclient_montominimo);
            messageClient.setMessageclient_id(lastMessage.getMessageclient_id());
            messageClient.update();

            Utility.logs.push(Maytapi.enviarMensajePorWhatsapp(objMessageStep, messageClient.getMessageclient_phone(), CHATBOOT_TYPEMSG_BTN));

            tipo = SUCCESS;
            mensajes.push("Dirección dentro de la zon de reparto.");
        }

        else if (lastMessage.getMessageclient_methodorder() == DELIVERY_MODALIDAD_PROGRAMADO) {

            // let messageClient = Object.assign({}, lastMessage);
            let objMessageStep = MessageclientModel.getMessageStepThreev3(
                objParametros.local_nombrecomercial,
                objParametros.messageclient_costoenvio,
                objParametros.messageclient_montominimo
            );

            messageClient.setMessageclient_status(ACTIVO);
            messageClient.setMessageclient_step(CHATBOOT_STEP_SCHEDULEDDATE);
            messageClient.setMessageclient_date(Utility.getFechaHoraActual());
            messageClient.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
            messageClient.setMessageclient_latitude(objGeo.latitude);
            messageClient.setMessageclient_longitude(objGeo.longitude);
            messageClient.setMessageclient_localid(objParametros.messageclient_localid);
            messageClient.setMessageclient_costoenvio(objParametros.messageclient_costoenvio);
            messageClient.setMessageclient_address(objGeo.address);
            messageClient.setMessageclient_addressreference(objGeo.addressreference);
            messageClient.setMessageclient_montominimo(objParametros.messageclient_montominimo);
            messageClient.setMessageclient_dateorder(objParametros.date);
            messageClient.setMessageclient_id(lastMessage.getMessageclient_id());
            messageClient.update();

            Utility.logs.push(Maytapi.enviarMensajePorWhatsapp(objMessageStep, messageClient.getMessageclient_phone(), CHATBOOT_TYPEMSG_BTN));
            tipo = SUCCESS;
            mensajes.push("Dirección dentro de la zon de reparto.");
        }
        else if (lastMessage.getMessageclient_methodorder() == DELIVERY_MODALIDAD_PORRECOGER) {
            if (objParametros.date && objParametros.local_id) {

                let localObj = await Establishment.getByLocal(objParametros.local_id);

                if (localObj != false && localObj != null) {

                    let localEncontrado = JSON.parse(localObj.establishment_localjson);

                    // let messageClient = Object.assign({}, lastMessage);
                    let objMessageStep = MessageclientModel.getMessageStepRecojoTienda(localEncontrado.local_nombrecomercial);
                    messageClient.setMessageclient_status(ACTIVO);
                    messageClient.setMessageclient_step(CHATBOOT_STEP_RECOJODATE);
                    messageClient.setMessageclient_date(Utility.getFechaHoraActual());
                    messageClient.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
                    messageClient.setMessageclient_latitude(objGeo.latitude);
                    messageClient.setMessageclient_longitude(objGeo.longitude);
                    messageClient.setMessageclient_localid(localEncontrado.local_id);
                    messageClient.setMessageclient_costoenvio(0);
                    messageClient.setMessageclient_address(objGeo.address);
                    messageClient.setMessageclient_addressreference(objGeo.addressreference);
                    messageClient.setMessageclient_dateorder(objParametros.date);
                    messageClient.setMessageclient_id(lastMessage.getMessageclient_id());
                    messageClient.update();

                    Utility.logs.push(Maytapi.enviarMensajePorWhatsapp(objMessageStep, messageClient.getMessageclient_phone(), CHATBOOT_TYPEMSG_BTN));
                    tipo = SUCCESS;
                }
                else {
                    tipo = ERROR;
                    mensajes.push("No se encontro un local y/o fecha valida.");
                }
            }
            else {
                tipo = ERROR;
                mensajes.push("Debe ingresar un local y/o fecha valida.");
            }
        }
        else {
            tipo = ERROR;
            mensajes.push(MESSAGE_STEP_DONTPERMISS);
        }
    }

    timeOperation.push("Fin proceso: " + Utility.getFechaActualConMilisegundos());

    data.timeOperation = timeOperation;
    data.mensajes = mensajes;
    data.tipo = tipo;
    data.data = datos;
    data.logs = Utility.logs;


    return data;
}

async function messageProductClient(objParametros) {

    let data = {};
    let mensajes = [];
    let tipo = ERROR;
    let datos = null;
    let timeOperation = [];
    timeOperation.push("Inicio proceso: " + Utility.getFechaActualConMilisegundos());
    let messageClient = new MessageclientModel();
    messageClient.setMessageclient_phone(objParametros.phone);
    let lastMessage = await messageClient.getLastMessageByPhone();
    console.log("asdsadsadsadasdsadsad",lastMessage)

    if (!objParametros.hasOwnProperty('products')) {
        tipo = ERROR;
        mensajes.push("Ingrese productos.");
    }

    if (!objParametros.hasOwnProperty('phone')) {
        tipo = ERROR;
        mensajes.push("Ingrese un telefono valido.");
    }

    if (mensajes.length === 0) {
        // let messageAux = new Messageclient();
        // messageAux.messageclient_phone = objParametros.phone;
        // let lastMessage = messageAux.getLastMessageByPhone();
        if (lastMessage != null &&
            (lastMessage.getMessageclient_step() == CHATBOOT_STEP_SELECTPRODUCT || lastMessage.getMessageclient_step() == CHATBOOT_STEP_SELECTPAYMENT)
        ) {
            // let messageClient = Object.assign({}, lastMessage);
            messageClient.setMessageclient_status(ACTIVO);
            messageClient.setMessageclient_step(CHATBOOT_STEP_SELECTPRODUCT);
            messageClient.setMessageclient_date(Utility.getFechaHoraActual());
            messageClient.setMessageclient_productjson(JSON.stringify(objParametros.products));
            messageClient.setMessageclient_costoproductos(objParametros.totalproductos);
            messageClient.setMessageclient_total(messageClient.getMessageclient_costoproductos() + messageClient.getMessageclient_costoenvio());
            messageClient.setMessageclient_id(lastMessage.getMessageclient_id());
            let objMessageStep = MessageclientModel.getMessageStepConfirmOrderOrUpdateProducts(messageClient.getMessageclient_phone(), messageClient.getMessageclient_productjson(), messageClient.getMessageclient_total(), messageClient.getMessageclient_methodorderTxt(), messageClient.getMessageclient_fullname(), messageClient.getMessageclient_address(), messageClient.getMessageclient_costoenvio(), messageClient.getMessageclient_dateorder());
            messageClient.setMessageclient_textsendwpp(JSON.stringify(objMessageStep));
            messageClient.update();
            Utility.logs.push(Maytapi.enviarMensajePorWhatsapp(objMessageStep, messageClient.getMessageclient_phone(), CHATBOOT_TYPEMSG_BTN));
            tipo = SUCCESS;
            mensajes.push("Productos agregados.");
        } else {
            tipo = ERROR;
            mensajes.push(MESSAGE_STEP_DONTPERMISS);
        }
    }

    timeOperation.push("Fin proceso: " + Utility.getFechaActualConMilisegundos());

    data["timeOperation"] = timeOperation;
    data["mensajes"] = mensajes;
    data["tipo"] = tipo;
    data["data"] = datos;
    data['logs'] = Utility.logs;
    return data;
}


function productListClient(phone) {

    let data = {};
    let mensajes = [];
    let tipo = ERROR;
    let datos = null;
    let timeOperation = [];
    timeOperation.push("Inicio proceso: " + Utility.getFechaActualConMilisegundos());

    if (mensajes.length === 0) {
        let messageAux = new Messageclient();
        messageAux.messageclient_phone = phone;
        let lastMessage = messageAux.getLastMessageByPhone();
        if (
            lastMessage != null && lastMessage.getMessageclient_step() != null &&
            lastMessage.getMessageclient_step() == CHATBOOT_STEP_SELECTPRODUCT
        ) {
            let productos = lastMessage.getMessageclient_productJsonToObj();
            if (productos == null || !Array.isArray(productos)) {
                productos = [];
            }
            datos = {};
            datos.productos = productos;
            datos.client = {};
            datos.client.messageclient_methodorder = lastMessage.getMessageclient_methodorder();
            datos.client.messageclient_address = lastMessage.getMessageclient_address();
            tipo = SUCCESS;
            mensajes.push("Listando productos encontrados.");
        } else {
            tipo = ERROR;
            mensajes.push(MESSAGE_STEP_DONTPERMISS);
        }
    }

    timeOperation.push("Fin proceso: " + Utility.getFechaActualConMilisegundos());

    data["timeOperation"] = timeOperation;
    data["mensajes"] = mensajes;
    data["tipo"] = tipo;
    data["data"] = datos;
    data['logs'] = Utility.logs;
    return data;
}



module.exports = { add, update,messageProductClient, messageLatLngDateClient, addMessageFromWebHoook, getById, deleteById, listByPagination, getAllActive };

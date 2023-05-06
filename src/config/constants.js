// constants.js

module.exports = {

    UNDEFINED: -1,
    REST_TODOS: -1,
    PARAM_TODOS: '-1',
    PARAM_ESTADO_TODOS: '-1',
    PARAM_ESTADO_ACTIVO: '1',
    PARAM_ESTADO_INACTIVO: '0',
    NO_DEFINIDO: -1,
    MODULO_ADDRESS: 1,
    MODULO_BRAND: 2,
    MODULO_CITY: 3,
    MODULO_CLIENT: 4,
    MODULO_CLIENTE: 5,
    MODULO_CLIENTEMODULO: 6,
    MODULO_COUNTRY: 7,
    MODULO_CURRENCY: 8,
    MODULO_DELIVERY: 9,
    MODULO_ESTABLISHMENT: 10,
    MODULO_LOG: 11,
    MODULO_MODULO: 12,
    MODULO_PERMISORESTAURANT: 13,
    MODULO_STATE: 14,
    MODULO_TOKEN: 15,
    MODULO_TYPEKITCHEN: 16,
    MODULO_TYPEPAYMENT: 17,
    SI: '1',
    NO: '0',
    USUARIO: '1',
    VALIDACION_DE_EMAIL_AL_CREAR_USUARIO_ESTA_ACTIVA: false,
    GOOGLE_FCM_PRODUCTION_API_KEY_PUSH: 'AAAAEFt7uX4:APA91bHGL4GAqT2KYsg_oUja98GoU61bvFd9ThTTTxX8TmEWPqNTnHQTNDlxlS3dnpiUnydS6-IqDtns1gDYzvejs9rwkxcH-SPLKwcQqXv3efclEAk239QZr0r6uJ2XCry944tmiuDq',
    TWILIO_SID: 'ACa82bf6901b3b252613765ba1e11829db',
    TWILIO_TOKEN: '7925570fcd3202e83eafffb882f234f9',
    TWILIO_PHONE_NUMBER: '+19034032160',
    PREFIX_DEFAULT: '+51',
    LENGTH_PHONE_DEFAULT: 9,
    VERSION_TERMS: '1',
    PAIS_PERU: "1",
    PAIS_MEXICO: "2",
    PAIS_COSTA_RICA: "3",
    PAIS_NICARAGUA: "4",
    PAIS_BRASIL: "5",
    PAIS_ESPANA: "7",
    PAIS_CHILE: "8",
    PAIS_COLOMBIA: "9",
    PLATFORM_ANDROID: "ANDROID",
    PLATFORM_IOS: "IOS",
    PLATFORM_WEB: "WEB",
    TEXT_NOMBRE_APLICACION: "AhorramasGO",
    DISTANCE_MIN_ADDRESS: "0.02",
    SUGERENCIA_AUTOMATICA: 1,
    SUGERENCIA_MANUAL: 2,
    SUGERENCIA_SEMIAUTOMATICA: 3,
    SUGERENCIA_INACTIVA: 0,
    SUGERENCIA_ACTIVA: 1,
    SUGERENCIA_ACEPTADA: 2,
    SUGERENCIA_RECHAZADA: 3,
    DELIVERY_MODALIDAD_INMEDIATA: "1",
    DELIVERY_MODALIDAD_PORRECOGER: "2",
    DELIVERY_MODALIDAD_PROGRAMADO: "3",
    PEDIDO_MODALIDAD_SALON: "4",
    DELIVERY_MODALIDAD_CANJE: "5",
    DELIVERY_MODALIDAD_INMEDIATA_TXT: "Entrega inmediata 🚚🕒",
    DELIVERY_MODALIDAD_PORRECOGER_TXT: "Recojo en tienda 🛍️👀",
    DELIVERY_MODALIDAD_PROGRAMADO_TXT: "Entrega programado para un día y hora 📅🕰️",
    RESTRINGIR_USO_DE_BANNER_EN_IOS: false,
    EVALUAR_CANTIDAD_COMPRA_OFERTAS_POR_DIA: false,
    CANTIDAD_COMPRA_OFERTAS_POR_DIA: 2,
    VALIDAR_MODALIDAD_DELIVERY_EN_METODO_OFERTA_LISTA_PRODUCTOS: true,
    MONTO_MINIMO_PARA_SUMAR_MONEDAS: 1,
    VALIDACION_DE_OFERTAS_POR_USUARIO_ESTA_ACTIVA: false,
    VALIDACION_DE_EMAIL_AL_CREAR_USUARIO_ESTA_ACTIVA: false,
    IDS_USUARIOS_GESTION_PRODUCTOS: '1,8',
    TIPO_REPORTE_SOLO_USUARIOS: '1',
    TIPO_REPORTE_SOLO_CLIENTES: '2',
    TIPO_ERROR_TIENDA_CERRADA: '4',
    VERSION_INICIAL_OFERTAS: 1,
    CALCULAR_COSTO_ENVIO_DISTANCIA: true,

    // Variables de cache
    USAR_CACHE_CONSULTAS_MYSQL: true,

    // Tipos de oferta
    OFERTA_PORCANTIDAD: "1",
    OFERTA_COMPRALLEVA: "2",
    OFERTA_PORPRECIO: "3",
    OFERTA_PORSALON: "4",

    LUNES: 1,
    MARTES: 2,
    MIERCOLES: 3,
    JUEVES: 4,
    VIERNES: 5,
    SABADO: 6,
    DOMINGO: 7,

    VIEWTYPE_HOME_CATEGORIES: '1',
    VIEWTYPE_HOME_PROMOCIONES: '2',
    VIEWTYPE_HOME_CERCADETI: '3',
    VIEWTYPE_HOME_VUELVEPEDIR: '4',
    VIEWTYPE_HOME_FAVORITOS: '5',
    VIEWTYPE_HOME_ENCUESTAS: '6',

    TITLE_CATEGORIES: 'Categorías',
    TITLE_PROMOCIONES: 'Promociones',
    TITLE_CERCADETI: 'Cerca de ti',
    TITLE_VUELVEPEDIR: 'Vuelve a pedir',
    TITLE_FAVORITOS: 'Restaurantes favoritos',
    TITLE_MAS_PEDIDOS: 'Los más pedidos',
    TITLE_ENCUESTAS: 'Personaliza DeliveryGO',
    TITLE_HISTORIAS: 'Historias DeliveryGO',

    DBBILLING_HOST: 'localhost',
    DBBILLING_NAME: 'restaurant_billing',
    DBBILLING_PORT: '3306',
    DBBILLING_USERNAME: 'root',
    DBBILLING_PASSWORD: '',

    DESTINAR_TODO_NODO_02: '0',

    MARIADB_MAXSCALE_PORT_SMART: '4006',
    MARIADB_MAXSCALE_PORT_WRITEANDREADER: '4007',
    MARIADB_MAXSCALE_PORT_READER: '4008',
    SUCCESS: 1,
    WARNING: 2,
    ERROR: 3,
    INFO: 4,
    ACTIVO: 1,
    INACTIVO: 0,
    LANG_REST: "ES",
    ES_MANTENIMIENTO: 0,
    SUBDOMINIO_AHORRA_MAS_GO: "ahorramasgo",
    HOST_QUIPUPOS: "64.150.187.9",
    DB_NAME_AHORRA_MAS_GO: "quipupos_ahorramasbo",
    USER_NAME_AHORRA_MAS_GO: "admin_ahorrambo",
    PASSWORD_AHORRA_MAS_GO: "8Ct8x^p8",
    PRODUCTION_IZIPAY: "1",
    TESTING_IZIPAY: "2",
    TIPOCATALAGO_DESCARGA: "1",
    TIPOCATALAGO_CONTACTO: "2",
    CORREO_PARA_NOTIFICAR_AMGO: "hola@ahorramasgo.com",
    BASE_MAYTA: "https://api.maytapi.com/api/",
    // MAYTA_PRODUCT_ID: "96f630d0-12e6-4901-ae0a-761b30b452ec",
    // MAYTA_TOKEN: "e2652029-bc6f-4d14-8416-cd05c121aabf",
    // MAYTA_PHONE_ID: "19299",
    MAYTA_PRODUCT_ID: "647986fc-9460-4ae1-8ca5-d6f73d00591d",
    MAYTA_TOKEN: "34b39f1a-3515-41d6-a0fa-979d98994118",
    MAYTA_PHONE_ID: "28689",
    CHATBOOT_STEP_LINEOUT: '-1',
    CHATBOOT_STEP_START: '0',
    CHATBOOT_STEP_METHODDELIVERY: '1',
    CHATBOOT_STEP_LOCATION: '2',
    CHATBOOT_STEP_RECOJODATE: '3',
    CHATBOOT_STEP_SCHEDULEDDATE: '4',
    CHATBOOT_STEP_SELECTPRODUCT: '5',
    CHATBOOT_STEP_SELECTPAYMENT: '6',
    CHATBOOT_STEP_CREATEORDER: '7',
    CHATBOOT_TYPEMSG_BTN: 'buttons',
    CHATBOOT_TYPEMSG_TEXT: 'text',
    CHATBOOT_MSG_RESET: 'RESET',
    CHATBOOT_LIMIT_LASTMESSAGE: 1,
    DATA_EXTRA_CHECKSUM: 'IPLP',
    DELIVERY_UPDATE_ORDER: '1',
    DELIVERY_CONFIRM_ORDER: '2',
    DELIVERY_UPDATE_ORDER_TXT: 'Actualizar los productos',
    DELIVERY_CONFIRM_ORDER_TXT: 'Confirmar orden',
    DELIVERY_PAYMENT_CE: '1',
    DELIVERY_PAYMENT_CP: '2',
    DELIVERY_PAYMENT_CE_TXT: 'Contra entrega efectivo 🤝💵',
    DELIVERY_PAYMENT_CP_TXT: 'Contra entrega POS  💳💰',
    MESSAGE_STEP_DONTPERMISS: 'No se encuentra en el paso para realizar esta acción.',
    CHOOSE_PRODUCTS: 'OK',
    CHOOSE_PRODUCTS_TXT: 'Escoger mis productos',
    KEYS_BITLY: { TOKEN: 'bb8b94d6f9f3f09a52ccdde71c668f36cbd4999c', URL: 'https://api-ssl.bitly.com/v4/shorten' },

    DOMINIO: "",
    SUBDOMINIO: "",

    // VARIBLES DE META
    NAME_TEMPLATE_STEP_ONE: "bienvenida",
    TOKEN_PARA_META: "793550265525818"
};
const { DELIVERY_MODALIDAD_INMEDIATA, DELIVERY_MODALIDAD_PROGRAMADO, DELIVERY_MODALIDAD_PORRECOGER, DELIVERY_MODALIDAD_INMEDIATA_TXT, DELIVERY_MODALIDAD_PROGRAMADO_TXT, DELIVERY_MODALIDAD_PORRECOGER_TXT, PARAM_ESTADO_TODOS, PARAM_TODOS, DELIVERY_MODALIDAD_INMEDIATA_TXT_META, DELIVERY_MODALIDAD_PROGRAMADO_TXT_META, DELIVERY_MODALIDAD_PORRECOGER_TXT_META } = require("../config/constants");
const EstablishmentSchema = require("../schemas/establishment.schema");

class Establishment {

  static async getEstablishmentButtonsMetodoDelivery(localConnection = null) {
    const buttons = [];
    const establishments = await this.getAll("","","",localConnection);
    let estaAbiertoParaDelivery = false;
    let estaAbiertoParaProgramarPedidos = false;
    let estaAbiertoParaRecojo = false;

    establishments.forEach((value) => {
      const datosLocal = JSON.parse(value.establishment_localjson);
      if (datosLocal.estaAbiertoParaDelivery) {
        estaAbiertoParaDelivery = true;
      }
      if (datosLocal.estaAbiertoParaProgramarPedidos) {
        estaAbiertoParaProgramarPedidos = true;
      }
      if (datosLocal.estaAbiertoParaRecojo) {
        estaAbiertoParaRecojo = true;
      }
    });

    if (estaAbiertoParaDelivery) {
      buttons.push({ id: DELIVERY_MODALIDAD_INMEDIATA, text: DELIVERY_MODALIDAD_INMEDIATA_TXT });
    }
    if (estaAbiertoParaProgramarPedidos) {
      buttons.push({ id: DELIVERY_MODALIDAD_PROGRAMADO, text: DELIVERY_MODALIDAD_PROGRAMADO_TXT });
    }
    if (estaAbiertoParaRecojo) {
      buttons.push({ id: DELIVERY_MODALIDAD_PORRECOGER, text: DELIVERY_MODALIDAD_PORRECOGER_TXT });
    }

    return buttons;
  }

  static async getEstablishmentButtonsMetodoDeliveryMeta(localConnection) {
    const buttons = [];
    const establishments = await this.getAll(-1,0,0,localConnection);
    let estaAbiertoParaDelivery = false;
    let estaAbiertoParaProgramarPedidos = false;
    let estaAbiertoParaRecojo = false;

    establishments.forEach((value) => {
      const datosLocal = JSON.parse(value.establishment_localjson);
      if (datosLocal.estaAbiertoParaDelivery) {
        estaAbiertoParaDelivery = true;
      }
      if (datosLocal.estaAbiertoParaProgramarPedidos) {
        estaAbiertoParaProgramarPedidos = true;
      }
      if (datosLocal.estaAbiertoParaRecojo) {
        estaAbiertoParaRecojo = true;
      }
    });

    if (estaAbiertoParaDelivery) {
      buttons.push({ type: 'reply' , reply: {id: DELIVERY_MODALIDAD_INMEDIATA, title: DELIVERY_MODALIDAD_INMEDIATA_TXT_META }});
    }
    if (estaAbiertoParaProgramarPedidos) {
      buttons.push({ type: 'reply' , reply: {id: DELIVERY_MODALIDAD_PROGRAMADO, title: DELIVERY_MODALIDAD_PROGRAMADO_TXT_META }});
    }
    if (estaAbiertoParaRecojo) {
      buttons.push({ type: 'reply' , reply: {id: DELIVERY_MODALIDAD_PORRECOGER, title: DELIVERY_MODALIDAD_PORRECOGER_TXT_META }});
    }

    return buttons;
  }

  static async getAll(estado = PARAM_ESTADO_TODOS, pagina = 0, registros = 0 , localConnection) {
    return (await this.getAllArray(estado, pagina, registros,localConnection))[
      "establishment_array"
    ];
  }

  static async  getAllArray(filter = PARAM_ESTADO_TODOS, pagina = 0, registros = 0,localConnection) {


      try {
        let start = (pagina - 1) * registros;
        let limit = registros;
    
        let sort = {};
        let near = {};
        let where = { establishment_state: 1 };
        if (filter !== PARAM_ESTADO_TODOS) {
          const filtro = JSON.parse(filter);
          const order = filtro.order;
          if (order === "1") {
            const latitude = filtro.latitude;
            const longitude = filtro.longitude;
            near = {
              center: {
                type: "Point",
                coordinates: [longitude, latitude]
              },
              spherical: true
            };
            sort = {
              distance: 1
            };
          }
          const city_id = filtro.city_id;
          if (city_id !== PARAM_TODOS) {
            where.city_id = city_id;
          }
        }
        const conexionModel = localConnection.model('establishmentSchema', EstablishmentSchema);
        const totalCount = await conexionModel.countDocuments(where);
        let establishment_array = await conexionModel.find(where, null, { ...near, ...sort }).skip(start).limit(limit);
    
        return { establishment_array, totalCount };
      } catch (error) {
        console.error(error);
        return { establishment_array: [], totalCount: 0 };
      }
    
  }

  static async getByLocal(local_id) {
    try {
      const establishment = await EstablishmentSchema.findOne({ establishment_localid: local_id }).exec();
      return establishment;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

}

module.exports = Establishment;

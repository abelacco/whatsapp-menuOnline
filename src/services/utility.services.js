const axios = require('axios');


class Utility {

    // static $client = null;
    // static $parameters = array();

    // static $SYNC_AGREGAR = "1";
    // static $SYNC_EDITAR = "2";
    // static $SYNC_ELIMINAR = "3";
    // static $SYNC_TIPO_REMOTO = "2";
    // static $SYNC_TIPO_LOCAL = "1";

    // static $READONLY_MARIA_SCALE = false;

    static logs = [];

    constructor() {
    }
     static async peticionPublica(url, metodo, body = {}, captureEspecialError = false, tiempoEspera = -1) {
      let tipo = "SUCCESS";
      let mensajes = [];
      let data = {};
    
      if (url.includes("deliverygo.app")) {
        url = url.replace("http://", "https://");
      }
    
      try {
        let timeout = 0;
        let connectTimeout = 30;
    
        if (tiempoEspera != -1) {
          timeout = 60;
          connectTimeout = 30;
        }
    
        const headers = {
          'Content-Type': 'application/json',
        };
    
        if (metodo === "POST") {
          const response = await axios.post(url, body, {
            headers,
            timeout,
            connectTimeout,
          });
          data = response.data;
        } else {
          const response = await axios.get(url, {
            headers,
            timeout,
            connectTimeout,
          });
          data = response.data;
        }
    
        if (!data.tipo) {
          mensajes.push("Ups, problemas en la petición (01).");
          tipo = "ERROR";
    
          if (captureEspecialError) {
            // Aquí podrías capturar el error
          }
        } else {
          tipo = data.tipo;
    
          if (!data.mensajes) {
            mensajes.push("Ups, problemas en la petición (03).");
          } else {
            mensajes.push(data.mensajes);
          }
        }
      } catch (error) {
        mensajes.push("Ups, problemas en la petición (02).");
        tipo = "ERROR";
    
        if (captureEspecialError) {
          // Aquí podrías capturar el error
        }
      }
    
      if (tipo === "ERROR") {
        data = {
          data: {},
          mensajes,
          tipo,
        };
      }
    
      return data;
    }

    static difHoras(dateStart, dateEnd) {
      try {
        const start = this.sqlInt(dateStart);
        const end = this.sqlInt(dateEnd);
        const difference = end - start;
        return difference / 3600;
      } catch (err) {
        console.log(err);
      }
      return 0;
    }

    static getFechaHoraActual() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hour = date.getHours().toString().padStart(2, '0');
      const minute = date.getMinutes().toString().padStart(2, '0');
      const second = date.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    static getFechaActualFormatoDate() {
      return new Date()
    }

     static getDiferenciaHoras(dateStart, dateEnd) {
      // try {
      //   const start = this.sqlInt(dateStart);
      //   const end = this.sqlInt(dateEnd);
      //   const difference = end - start;
      //   return difference / 3600;
      // } catch (err) {
      //   console.log(err);
      // }
      // return 0;
      const diffInMilliseconds = Math.abs(dateEnd - dateStart);
      const hours = diffInMilliseconds / (1000 * 60 * 60);
      return hours;
    }
    
     static sqlInt(dateAux) {
      const date = this.sqlArray(dateAux);

      if (
        this.isNumeric(date.hour) ||
        this.isNumeric(date.minutes) ||
        this.isNumeric(date.month) ||
        this.isNumeric(date.day) ||
        this.isNumeric(date.year)
      ) {
        console.log(`La fecha ${dateAux} no es valida`);
      }
      return new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.minutes
      ).getTime();
    }
    
     static sqlArray(date, trim = true) {
      const result = {};
      result.day = trim
        ? parseInt(date.substring(8, 10).replace(/^0+/, ""))
        : parseInt(date.substring(8, 10));
      result.month = trim
        ? parseInt(date.substring(5, 7).replace(/^0+/, ""))
        : parseInt(date.substring(5, 7));
      result.year = parseInt(date.substring(0, 4));
      result.hour = parseInt(date.substring(11, 13));
      result.minutes = parseInt(date.substring(14, 16));
      return result;
    }
    
     static isNumeric(str) {
      if (typeof str != "string") return false;
      return !isNaN(str) && !isNaN(parseFloat(str));
    }
    
    static getFechaActualConMilisegundos() {
      const date = new Date();
      return date.toISOString();
    }

    static roundNumber(numero, decimales = 2) {
      try {
        if (!isNaN(numero)) {
          numero = Number(numero).toFixed(decimales);
        }
        return numero;
      } catch (er) {
        return numero;
      }
    }

    static obtenerFechaConFormato(stringFecha, formato = "DD/MM/YYYY") {
      if (!stringFecha || stringFecha == null) return "";
    
      try {
        const date = new Date(stringFecha);
        const options = { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit' 
        };
        const formattedDate = new Intl.DateTimeFormat('es-PE', options).format(date);
        const formattedParts = formattedDate.split('/');
        const formatted = formato.replace('DD', formattedParts[0]).replace('MM', formattedParts[1]).replace('YYYY', formattedParts[2]);
        return formatted;
      } catch (error) {
        console.error(error);
        return "";
      }
    }
    
    
    
    

}

module.exports = Utility;
const Utility = require("./utility.services");

class Bitly {

    static async getLinkEncodedMsQuipu(url, tiempoespera = 10) {
        let link = null;
      
        const body = {
          url: url
        };
      
        const response = await Utility.peticionPublica("http://l.quipupos.com/generarLink.php", "POST", body);
      
        if (response.tipo == 1 && response.data) {
          link = response.data;
        } else {
          link = url;
        }
      
        return link;
      }
      

}

module.exports = Bitly;
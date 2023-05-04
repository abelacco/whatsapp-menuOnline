
class Security {


    static restaurantpe = 'restaurant.pe';
    static deliverygo = 'deliverygo.app';
    static quipuposcom = 'quipupos.com';
    static restpecom = 'restpe.com';
    static dominio;
    static  subdominio;

    static  obtenerDominiodeSubdominio(subdominio, dominio) {
        if(dominio == 'restaurantpe') {
            this.dominio = this.restaurantpe
        } else if(dominio == 'quipuposcom') {
            this.dominio = this.quipuposcom
        }
        this.subdominio = subdominio;
        console.log(this.subdominio + "." + this.dominio)
    }

    static getSubdomain() {
        // const regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
        // const urlParts = regexParse.exec(window.location.hostname) || [];
        // let subdominioretorno = window.location.hostname.replace(urlParts[0], '').slice(0, -1);
        // if (Array.isArray(urlParts) && urlParts.length > 0) {
        //     const dominio = urlParts[0];
        //     if (dominio === this.quipuposcom || dominio === this.restaurantpe || dominio === this.deliverygo) {
        //     } else {
        //     subdominioretorno = 'demoperu';
        //     }
        // }
        
        let subdominioretorno = this.subdominio == null ? 'demoperu' : this.subdominio;
        return subdominioretorno;
    }

     static getDominio() {
        // const hostName = window.location.hostname;
        // let hostNameRetorno = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    
        // if (hostNameRetorno == this.quipuposcom || hostNameRetorno == this.restaurantpe || hostNameRetorno == this.deliverygo) {
    
        // } else {
        //   hostNameRetorno = this.restaurantpe;
        // }
        let hostNameRetorno = this.dominio == null ? this.restaurantpe : this.dominio;

        return hostNameRetorno;
      }

}

module.exports = Security;
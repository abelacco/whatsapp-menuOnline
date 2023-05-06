
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
    }

    static getSubdomain() {

        
        let subdominioretorno = this.subdominio == null ? 'demoperu' : this.subdominio;
        return subdominioretorno;
    }

     static getDominio() {

        let hostNameRetorno = this.dominio == null ? this.restaurantpe : this.dominio;

        return hostNameRetorno;
      }

}

module.exports = Security;
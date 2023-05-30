class MenuEstablishment {

     static  getByEstablishment($stablishment_id){

        // global $pdo;

        // $sql = "select * FROM menuestablishment WHERE establishment_id = '" . $stablishment_id ."' order by menuestablishment_id desc limit 1 ";

        // $stmt = $pdo->prepare($sql);
        // $stmt->execute();
        // $stmt->setFetchMode(PDO::FETCH_ASSOC);
        // $row = $stmt->fetch();
        // if ($row) {
        //     return new Menustablishment($row);
        // } else {
        //     return null;
        // }
    }
}

module.exports = MenuEstablishment;
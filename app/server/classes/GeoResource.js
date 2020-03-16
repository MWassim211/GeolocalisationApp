class GeoRessource {
    constructor(
        id ="toto",
        url = "http://example.com/users/toto/avatar.png",
        position = [10,10],         //Lating of Leaflet
        blurred =  true,
        role =  "infected",
        ttl = 0,
        status = "alive",
        trophys = [
          {
            "action": "infected"
          }
        ]

    ){
        this.id = id;
        this.url = url;
        this.position = position;
        this.blurred = blurred;
        this.role = role;
        this.ttl = ttl;
        this.status = status;
        this.trophys = trophys;
    }
}   

module.exports = GeoRessource;
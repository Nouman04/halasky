const locations = require('../public/files/destinations.json');

module.exports = {
    locationDetail : (locationCode) =>{
        return locations.find( location => {
            return location.code === locationCode;
        }) 
    }
}
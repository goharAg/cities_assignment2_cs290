const axios = require('axios');
const NotFoundError = require('../common/errors/not-found.error');

module.exports = {
    async getCityDataByZipCode(zipCode){
        return axios.get(`https://api.zippopotam.us/us/${zipCode}`)
        .then((data) => {
            return `${data.data.places[0]['place name']}, ${data.data.places[0]['state abbreviation']}, ${data.data.country}`;
        })
        .catch((e) =>  {
            throw new NotFoundError(`No cities found!`);
        })
    }
}
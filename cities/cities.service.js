const NotFoundError = require('../common/errors/not-found.error');

const citiesRepository = require('./cities.repository');

module.exports = {
    async getCityByZipCode(zipCode){
        const result = await citiesRepository.getCityDataByZipCode(zipCode);
        console.log(result)
        if(!result){
            throw new NotFoundError(`No cities found!`);
        }
        return result;
    }
}
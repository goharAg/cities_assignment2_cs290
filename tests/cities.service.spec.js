const rewire = require("rewire");
const chai = require("chai");
const chaiAsPromise = require("chai-as-promised");
const NotFoundError = require("../common/errors/not-found.error");
const faker  = require('@faker-js/faker').faker;
chai.use(chaiAsPromise);


const expect = chai.expect;

describe("Testing cities.service file", function () {
    let citiesService;

    this.beforeEach(()=>{
        
        citiesService = rewire("../cities/cities.service");
    });

    describe("Testing getCityByZipCode function", function () {
        it("should return sucessful result", async function () {
           faker.seed(123);
           const address = `${faker.address.cityName()}, ${faker.address.stateAbbr()}, ${faker.address.country()}`;
           
           citiesService.__set__({
                citiesRepository: {
                    getCityDataByZipCode: (zipCode) =>{
                        return address;
                    }
                }
           });

            return expect(citiesService.getCityByZipCode('4')).to.eventually.equal(address);
        });

        it("should return NotFoundError", async function () {
            citiesService.__set__({
                citiesRepository: {
                    getCityDataByZipCode: () =>{
                        return "";
                    }
                }
           });
        
            return expect(citiesService.getCityByZipCode()).to.eventually.rejectedWith('No cities found!')
            .and.be.an.instanceOf(NotFoundError);
            
            
          });
    });    

});
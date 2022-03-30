const sinon = require("sinon");
const chai = require("chai");
const chaiAsPromise = require("chai-as-promised");
const citiesRepository = require("../cities/cities.repository")
const axios = require('axios');
chai.use(chaiAsPromise);

const expect = chai.expect;

describe("Testing cities.repository file", function () {

    describe("Testing getCityDataByZipCode function", function () {
        it("should call the function exaclty once with correct parameters", async function () {
            const axiosGetStub = sinon.stub(axios, 'get');
            axiosGetStub.withArgs('https://api.zippopotam.us/us/4')
            .returns(Promise.resolve({
                data: {
                    "post code": "94122",
                    "country": "United States",
                    "country abbreviation": "US",
                    "places": [
                        {
                        "place name": "San Francisco",
                        "longitude": "-122.4836",
                        "state": "California",
                        "state abbreviation": "CA",
                        "latitude": "37.7593"
                        }
                    ]
                }    
            }));

          
            await expect(citiesRepository.getCityDataByZipCode('4')).to.eventually.equal('San Francisco, CA, United States')
            expect(axiosGetStub.calledOnceWithExactly('https://api.zippopotam.us/us/4')).to.be.true;
        });
    });    

});
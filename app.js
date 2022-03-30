const errorHandler = require('./common/middlewares/error-handler.middleware');
const express = require('express');
const app = express();

const citiesController = require('./cities/cities.controller');


app.use(express.json());

app.use('/cities', citiesController);

app.listen(3000, () => {
    console.log('Server is running!');
});

app.use(errorHandler);
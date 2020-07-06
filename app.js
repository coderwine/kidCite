require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/usercontroller');

sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

app.use('/', user);


app.listen(process.env.PORT, () => {
    console.log(`**********************LISTENING ON ${process.env.PORT}**********************`);
});
require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');
// const bodyParser = require('body-parser');

//! CONTROLLERS
const user = require('./controllers/usercontroller');
const kid = require('./controllers/kidcontroller');
const quote = require('./controllers/quotecontroller');

//! DATABASE
sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());
// app.use(bodyParser.json())
app.use(require('./middleware/headers'));

//! ROUTES
app.use('/', user);
// app.use(require('./middleware/validate-session'))
app.use('/kids', kid);
app.use('/quotes', quote);


app.listen(process.env.PORT, () => {
    console.log(`**********************LISTENING ON ${process.env.PORT}**********************`);
});
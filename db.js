require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize('kidCite', 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    () => {
        console.log('kidCite DB is connected!')
    }, 
    err => console.log(err)
);

module.exports = sequelize
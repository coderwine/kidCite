require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    () => {
        console.log(`${process.env.NAME} DB is connected!`)
    }, 
    err => console.log(err)
);

//! DB Associations:
const User = sequelize.import('./models/user');
const Kid = sequelize.import('./models/kid');
const Quote = sequelize.import('./models/quote');


User.hasMany(Kid);
Kid.belongsTo(User);

User.hasMany(Quote);
Quote.belongsTo(User);


module.exports = sequelize
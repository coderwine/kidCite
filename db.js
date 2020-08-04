require('dotenv').config()
const Sequelize = require('sequelize');

//! Localhost (for building)
// const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
//     host: 'localhost',
//     dialect: 'postgres'
// });

//! Heroku Deploy
const sequelize = new Sequelize(process.env.HDB_URL), {
    dialect: 'postgres'
}

//*SPECIAL CHARACTER ENCODED URL
// const sequelize = new Seuelize(process.env.HDB_URL || `postgresql://postgres:${encodeURIComponent(proess.env.PASS)}@localhost/kidcite`), {
//     dialect: 'postgres'
// }

//! AWS Trial - not working currently
// const sequelize = new Sequelize(process.env.AWS_NAME, 'postgres', process.env.AWS_PASS, {
//     dialect: 'postgres',
    // host: process.env.AWS_HOST,
    // user: process.env.AWS_USER,
    // password: process.env.AWSRDS_PASS,
    // database: process.env.DB
// });

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
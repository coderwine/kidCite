const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {

    const Quotes = sequelize.define('quote', {
        desc: {
            type: DataTypes.TEXT(2500),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    })
}
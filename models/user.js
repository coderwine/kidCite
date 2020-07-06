// const sequelize = require("../db");
// const { DataTypes, Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'admin'],
            defaultValue: 'user',
            // allowNull: false
        },
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV1,
            // unique: true,
            // allowNull: false
        },
    })
    return User;
}
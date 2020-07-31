module.exports = (sequelize, DataTypes) => {

    const Quote = sequelize.define('quote', {
        title: {
            type: DataTypes.STRING,
            defaultValue: 'Untitled'
        },
        desc: {
            type: DataTypes.TEXT(2500)
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: {
                args: false,
                msg: 'Please input Date'
            }
        },
        randomQuestion: {
            type: DataTypes.STRING(255)
        },
        possAnswer: {
            type: DataTypes.STRING(255)
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
    })

    return Quote;

}
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Please input a unique email address.'
            },
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                // len: [8,20]
            }
        },
        role: {
            type: DataTypes.ENUM(
                'user', 'admin',
            ),
            defaultValue: 'user',
            // allowNull: false
        },
        bio: {
            // type: DataTypes.TEXT('long'),
            type: DataTypes.TEXT(),
            allowNull: true,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }

    })

    return User;

}
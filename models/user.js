'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        idCard: DataTypes.STRING,
        type: DataTypes.STRING,
        password: DataTypes.STRING
    });

    User.prototype.verifyPassword = function verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
    };

    return User;
};



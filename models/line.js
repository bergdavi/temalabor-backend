'use strict';

module.exports = (sequelize, DataTypes) => {
    const Line = sequelize.define('Line', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING
    });

    return Line;
};



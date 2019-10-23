'use strict';

module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        licencePlate: {
            type: DataTypes.STRING,
            unique: true
        },
        // TODO add constraint so wrong type vehicle can't be assigned to line
        type: DataTypes.STRING,
		line: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'Lines',
				key: 'id'
			}
		}
    });

    Vehicle.associate = models => {
        Vehicle.belongsTo(models.Line, {foreignKey: 'line'});
    };

    return Vehicle;
};


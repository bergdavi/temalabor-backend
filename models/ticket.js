'use strict';

module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        typeId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        type: DataTypes.STRING,
        validFor: DataTypes.INTEGER,
		line: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'Lines',
				key: 'id'
			}
		},
        price: DataTypes.INTEGER
    });

    Ticket.associate = models => {
        Ticket.belongsTo(models.Line, {foreignKey: 'line'});
    };

    return Ticket;
};



'use strict';

module.exports = (sequelize, DataTypes) => {
    const BoughtTicket = sequelize.define('BoughtTicket', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        validFrom: DataTypes.DATE,
        validUntil: DataTypes.DATE,
		ticketType: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'Tickets',
				key: 'typeId'
			}
		},
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    }, {
        timestamps: true,
        paranoid: true
    });

    BoughtTicket.associate = models => {
        BoughtTicket.belongsTo(models.User, {foreignKey: 'user'});
        BoughtTicket.belongsTo(models.Ticket, {foreignKey: 'ticketType'});
    };

    return BoughtTicket;
};



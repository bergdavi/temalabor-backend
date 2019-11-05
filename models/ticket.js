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
        validTimeUnit: DataTypes.STRING,
		line: {
			type: DataTypes.STRING,
			allowNull: true,
			references: {
				model: 'Lines',
				key: 'id'
			}
		},
        price: DataTypes.INTEGER
    }, {
        timestamps: true,
        paranoid: true
    });

    Ticket.prototype.getExpiration = function (startDate) {
        if(!this.validFor) {
            return null;
        }
        if(!startDate) {
            return null;
        }
        const timeZoneOffset = 1;
        switch (this.validTimeUnit) {
            case 'day':
                let endDate = new Date(startDate.getTime() + this.validFor * 1000 * 60 * 60 * 24);
                endDate.setUTCHours(23-timeZoneOffset, 59, 59, 999);
                return endDate;
            case 'hour':
                return new Date(startDate.getTime() + this.validFor * 1000 * 60 * 60);
            default:
                throw "Wrong time unit";
        }
    };

    Ticket.prototype.getTypeName = function () {
        let ticketType = 'lineTicket';
        if(this.validFor) {
            if(this.validTimeUnit === 'hour') {
                ticketType = 'timeTicket';
            } else if(this.validTimeUnit === 'day') {
                ticketType = 'passTicket';
            }
        }
        return ticketType;
    };

    Ticket.associate = models => {
        Ticket.belongsTo(models.Line, {foreignKey: 'line'});
    };

    return Ticket;
};



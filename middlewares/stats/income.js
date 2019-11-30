const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');
const op = require('sequelize').Op;

module.exports = function () {
    return function (req, res, next) {
        let until = new Date();
        if(req.query.until) {
            until = new Date(req.query.until);
            until = new Date(until.getTime() + 1000*60*60);
        }
        until.setUTCHours(23,59,59,999);
        let from = new Date(until.getTime() - 1000 * 60 * 60 * 24 * 30);
        if(req.query.from) {
            from = new Date(req.query.from);
            from = new Date(from.getTime() + 1000*60*60);
        }
        from.setUTCHours(0,0,0,0);

        models.BoughtTicket.findAll({where: {
                [op.and]: [
                    {
                        createdAt: {[op.lte]: until}
                    },
                    {
                        createdAt: {[op.gte]: from}
                    }
                ]
        }, include: [models.Ticket]}).then(function (tickets) {
            let sales = [];
            let days = Math.floor((until - from)/(1000 * 60 * 60 * 24));
            for(let i = 0; i <= days; i++) {
                let day = new Date(from.getTime() + 1000*60*60*24*(i));
                sales.push({
                    income: 0,
                    day: `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
                })
            }
            tickets.forEach(function (ticket) {
                let created = ticket.createdAt;
                created.setUTCHours(0, 0, 0, 0);
                let day = Math.round((created - from)/(1000 * 60 * 60 * 24));
                if(ticket.Ticket && ticket.Ticket.price) {
                    sales[day].income += ticket.Ticket.price;
                }
            });
            res.json(sales);
        });
    };
};

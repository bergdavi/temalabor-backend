const models  = require('../../models');
const op = require('sequelize').Op;

module.exports = function () {
    return function (req, res, next) {
        let until = new Date();
        until.setUTCHours(23,59,59,999);
        let from = new Date(until.getTime() - 1000 * 60 * 60 * 24 * 30);
        from.setUTCHours(0,0,0,0);

        models.User.findAll({where: {
                [op.and]: [
                    {
                        createdAt: {[op.lte]: until}
                    },
                    {
                        createdAt: {[op.gte]: from}
                    }
                ]
        }}).then(function (users) {
            let sales = [];
            let days = Math.floor((until - from)/(1000 * 60 * 60 * 24));
            for(let i = 0; i <= days; i++) {
                let day = new Date(from.getTime() + 1000*60*60*24*(i));
                sales.push({
                    registered: 0,
                    day: `${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
                })
            }
            users.forEach(function (user) {
                let created = user.createdAt;
                created.setUTCHours(0, 0, 0, 0);
                let day = Math.round((created - from)/(1000 * 60 * 60 * 24));
                sales[day].registered++;
            });
            res.json(sales);
        });
    };
};

const models  = require('../../models');

module.exports = function () {
    return function (req, res, next) {
        models.User.findAll().then(function (users) {
            let userList = [];
            users.forEach(user => userList.push({
                id: user.id,
                email: user.email,
                name: user.name,
                idCard: user.idCard,
                type: user.type
            }));
            res.json(userList);
        });
    };
};

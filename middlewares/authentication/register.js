const bcrypt = require('bcrypt');

const models  = require('../../models');
const ApplicationError = require('../../exceptions/ApplicationError');

module.exports = function () {
    return function (req, res, next) {
        // If email is not taken salt + hash password
        bcrypt.hash(req.body.password, 10).then((hash) => {
            models.User.create({
                name: req.body.name,
                idCard: req.body.idCard,
                email: req.body.email,
                password: hash,
                type: req.body.type
            }).then(function (user) {
                if (user) {
                    res.json({status: 'ok', description: 'User created successfully'});
                } else {
                    res.status(500).send('Error in insert new record');
                }
            });
        });
    };
};

const bcrypt = require('bcrypt');
const ApplicationError = require('../../exceptions/ApplicationError');
const models  = require('../../models');

module.exports = function () {
    return function (req, res, next) {
        if(req.user.verifyPassword(req.body.oldPassword)) {
            bcrypt.hash(req.body.newPassword, 10).then((hash) => {
                models.User.findOne({where: {id: req.user.id}}).then(function (user) {
                    if(!user) {
                        return next(new ApplicationError(`User not found`, 500));
                    }
                    user.update({
                        password: hash
                    }).then(function() {
                        return res.end('Password updated successfully');
                    });
                });
            });
        } else {
            return next(new ApplicationError('Wrong password', 401));
        }
    };
};

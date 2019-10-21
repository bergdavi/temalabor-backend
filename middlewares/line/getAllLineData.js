const models  = require('../../models');

module.exports = function () {
    return function (req, res, next) {
        models.Line.findAll().then(function (lines) {
            let lineList = [];
            lines.forEach(line => lineList.push({
                id: line.id,
                name: line.name,
                type: line.type
            }));
            res.json(lineList);
        });
    };
};

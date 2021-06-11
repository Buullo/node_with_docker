const isUnique = (modelName, field) => {
  return (value, next) => {
    const Model = require("../models")[modelName];
    const query = {};
    query[field] = value;
    Model.findOne({where: query, attributes: ["id"]}).then(function(obj) {
      if (obj) {
        next(field + ' "' + value + '" is already in use');
      } else {
        next();
      }
    });
  };
}



module.exports = {
  isUnique,
};
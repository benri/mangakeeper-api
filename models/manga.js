
module.exports = function (sequelize, DataTypes) {
  var manga = sequelize.define('manga', {
    name: {
      type: DataTypes.STRING,
      field: 'name'
    }
  }, {
    freezeTableName: true
  });

  return manga;
};

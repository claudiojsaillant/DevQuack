module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Exampl", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};

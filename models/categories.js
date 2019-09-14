module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Categories.associate = function(models) {
    // Associating Users with Comments
    // When a User is deleted, also delete any associated Comments
    Categories.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };
  return Categories;
};

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Category.associate = function(models) {
    // Associating Users with Comments
    // When a User is deleted, also delete any associated Comments
    Category.hasMany(models.Posts, {
      onDelete: "cascade"
    });
  };
  return Category;
};

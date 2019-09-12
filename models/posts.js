module.exports = function(sequelize, DataTypes) {
  var Posts = sequelize.define("Posts", {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.DECIMAL
    }
  });

  Posts.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Posts.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Posts.associate = function(models) {
    // Associating Users with Comments
    // When a User is deleted, also delete any associated Comments
    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };

  Posts.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Posts.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Posts;
};

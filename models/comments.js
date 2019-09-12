module.exports = function(sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Comments.associate = function(models) {
    // We're saying that a Comment should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Comments.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Comments.belongsTo(models.Posts, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Comments;
};

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileUrl: DataTypes.STRING
  });

  Users.associate = function(models) {
    // Associating Users with Posts
    // When a User is deleted, also delete any associated Posts
    Users.hasMany(models.Posts, {
      onDelete: "cascade"
    });

    Users.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  };

  return Users;
};

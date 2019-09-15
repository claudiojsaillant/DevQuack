var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(user) {
      res.render("index", {
        msg: "Welcome!",
        users: user
      });
    });
  });

  app.get("/welcome/:userid", function(req, res) {
    var userId = req.params.userid;
    db.Users.findAll({
      where: {
        id: userId
      }
    }).then(function(userData) {
      res.render("logged", {
        user: userData
      });
    });
  });

  app.get("/user/:username", function(req, res) {
    var username = req.params.username;
    db.Users.findAll({
      where: {
        username: username
      }
    }).then(function(userData) {
      if (userData.length !== 0) {
        res.render("profile", {
          msg: "Welcome " + userData[0].firstName + " " + userData[0].lastName,
          user: userData
        });
      }
    });
  });

  app.get("/newpost/:userId", function(req, res) {
    var userId = req.params.userId;
    db.Users.findAll({
      where: {
        id: userId
      }
    }).then(function(data) {
      res.render("newpost", {
        user: data
      });
    });
  });
};

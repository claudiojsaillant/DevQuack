var db = require("../models");

module.exports = function(app) {
  // All users with posts.
  app.get("/api/users", function(req, res) {
    db.Users.findAll({
      include: [db.Posts]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Specific user with posts
  app.get("/api/users/:id", function(req, res) {
    var userId = req.params.id;
    db.Users.findAll({
      where: {
        id: userId
      },
      include: [db.Posts]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Create new user
  app.post("/api/user", function(req, res) {
    db.Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      profileUrl: req.body.profileUrl
    }).then(function(data) {
      res.json(data);
    });
  });

  //Delete an user
  // app.delete("/api/post/:id", function(req, res) {
  //   db.Users.destroy({ where: { id: req.params.id } }).then(function(data) {
  //     res.json(data);
  //   });
  // });

  // TESTING USER CREATION

  app.get("/test/createUser", function(req, res) {
    db.Users.create({
      firstName: "Clauds",
      lastName: "Saillant",
      userName: "csaillan",
      password: "123",
      profileUrl:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/irish-actor-pierce-brosnan-as-james-bond-in-a-publicity-news-photo-138084872-1551742467.jpg?crop=1xw:1xh;center,top&resize=480:*"
    }).then(function(data) {
      res.json(data);
    });
  });
};

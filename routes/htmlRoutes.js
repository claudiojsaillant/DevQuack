var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Users.findAll({}).then(function(user) {
  //     res.render("index2", {
  //       msg: "Welcome!",
  //       users: user
  //     });
  //     console.log(user);
  //   });
  // });
  app.get("/", function(req, res) {
    db.Posts.findAll({
      where: {
        CategoryId: "1"
      },
      include: [db.Categories, db.Comments, db.Users]
    }).then(function(user) {
      res.render("index2", {
        msg: "Welcome!",
        users: user
      });
      console.log(user);
    });
  });
  app.get("/welcome/:userid/:categoryid", function(req, res) {
    var categoryid = req.params.categoryid;
    var userId = req.params.userid;
    db.Users.findAll({
      where: {
        id: userId
      },
      include: [db.Posts]
    }).then(function(user) {
      publicPosts = [];
      for (i = 0; i < user[0].Posts.length; i++) {
        if (user[0].Posts[i].CategoryId === parseInt(req.params.categoryid)) {
          publicPosts.push(user[0].Posts[i]);
        }
      }
      console.log(publicPosts);
      console.log(categoryid);
      res.render("profilepage", {
        postsNumber: user[0].Posts.length,
        user: user[0],
        publicPosts: publicPosts
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
        res.render("profilePage", {
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

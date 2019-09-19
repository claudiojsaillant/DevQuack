var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Posts.findAll({
      where: {
        CategoryId: "1"
      },
      include: [db.Categories, db.Comments, db.Users]
    }).then(function(postsData) {
      res.render("index", {
        msg: "Welcome!",
        posts: postsData
      });
    });
  });
  app.get("/welcome/:userid/:categoryid", function(req, res) {
    var categoryid = req.params.categoryid;
    var userId = req.params.userid;
    db.Users.findAll({
      where: {
        id: userId
      },
      include: [db.Posts, db.Comments]
    }).then(function(user) {
      publicPosts = [];
      console.log(user);

      for (i = 0; i < user[0].Posts.length; i++) {
        if (user[0].Posts[i].CategoryId === parseInt(req.params.categoryid)) {
          publicPosts.push(user[0].Posts[i]);
        }
      }

      console.log(publicPosts);
      console.log(categoryid);
      console.log(user[0].profileUrl, "URL");
      res.render("profilepage", {
        url: user[0].profileUrl,
        postsNumber: user[0].Posts.length,
        user: user[0],
        publicPosts: publicPosts.reverse()
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

  app.get("/post/:id", function(req, res) {
    var postId = req.params.id;

    db.Posts.findAll({
      where: {
        id: postId
      },
      include: [db.Users, db.Comments]
    }).then(function(data) {
      db.Comments.findAll({
        where: {
          PostId: data[0].id
        },
        include: [db.Users]
      }).then(function(myData) {
        res.render("comments", {
          msg: "Heyyyyy",
          post: data[0],
          comment: myData
        });
        // res.json(myData);
      });
    });
  });
};

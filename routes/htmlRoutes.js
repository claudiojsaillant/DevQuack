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
      // res.json(postsData);
    });
  });

  app.get("/register", function(req, res) {
    res.render("registration");
  });

  app.get("/welcome/:userid/:categoryid", function(req, res) {
    // var categoryid = req.params.categoryid;
    var userId = req.params.userid;
    db.Users.findAll({
      where: {
        id: userId
      },
      include: [db.Posts, db.Comments]
    }).then(function(user) {
      publicPosts = [];
      console.log(user);
      if (user[0]) {
        for (i = 0; i < user[0].Posts.length; i++) {
          if (user[0].Posts[i].CategoryId === parseInt(req.params.categoryid)) {
            publicPosts.push(user[0].Posts[i]);
          }
        }

        res.render("profilepage", {
          url: user[0].profileUrl,
          postsNumber: user[0].Posts.length,
          user: user[0],
          publicPosts: publicPosts.reverse()
        });
      } else {
        res.render("404");
      }
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
      if (data[0]) {
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
        });
      } else {
        res.render("404");
      }
    });
  });
};

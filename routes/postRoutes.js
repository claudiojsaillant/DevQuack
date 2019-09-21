var db = require("../models");

module.exports = function(app) {
  // All posts with comments, users and category
  app.get("/api/posts", function(req, res) {
    db.Posts.findAll({
      include: [db.Categories, db.Comments, db.Users]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Specific post with comments and users and category
  app.get("/api/posts/:id", function(req, res) {
    var postId = req.params.id;
    db.Posts.findAll({
      where: {
        id: postId
      },
      include: [db.Categories, db.Comments, db.Users]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Posts by category with comments and users
  app.get("/api/posts/category/:categoryid/", function(req, res) {
    var categoryId = req.params.categoryid;
    db.Posts.findAll({
      where: {
        CategoryId: categoryId
      },
      include: [db.Categories, db.Comments, db.Users]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Posts by users in category
  app.get("/api/posts/category/:categoryid/user/:userid", function(req, res) {
    var categoryId = req.params.categoryid;
    var userId = req.params.userid;
    db.Posts.findAll({
      where: {
        UserId: userId,
        CategoryId: categoryId
      },
      include: [db.Categories, db.Comments, db.Users]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Create new post
  app.post("/newpost/:userId", function(req, res) {
    db.Posts.create({
      content: req.body.content,
      title: req.body.title,
      CategoryId: req.body.CategoryId,
      UserId: req.body.UserId,
      stars: 0
    }).then(function(data) {
      res.json(data);
    });
  });

  // Update post
  app.put("/api/posts", function(req, res) {
    db.Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
        CategoryId: req.body.categoryId
      },
      {
        where: {
          id: req.body.id
        }
      }
    ).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Delete Post
  app.delete("/api/post/:id", function(req, res) {
    db.Posts.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/test/createNewCat1", function(req, res) {
    db.Categories.create({
      name: "Public"
    }).then(function(data) {
      res.json(data);
    });
  });
  
  app.get("/test/createNewCat2", function(req, res) {
    db.Categories.create({
      name: "Project"
    }).then(function(data) {
      res.json(data);
    });
  });
  
  app.get("/test/createNewCat3", function(req, res) {
    db.Categories.create({
      name: "Private"
    }).then(function(data) {
      res.json(data);
    });
  });

};



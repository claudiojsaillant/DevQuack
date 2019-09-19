var db = require("../models");

module.exports = function(app) {
  // New comment
  app.post("/api/comment", function(req, res) {
    db.Comments.create({
      content: req.body.content,
      upvotes: 0,
      UserId: req.body.userId,
      PostId: req.body.postId
    }).then(function(data) {
      res.json(data);
    });
  });
  app.get("/addCommentTest", function(req, res) {
    db.Comments.create({
      content: "Posting a text as comment",
      upvotes: 0,
      UserId: "3",
      PostId: "22"
    }).then(function(data) {
      res.json(data);
    });
  });

  // Delete comment
  app.delete("/api/comment/:id", function(req, res) {
    db.Comments.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/comment/:id", function(req, res) {
    db.Comments.update(
      {
        content: req.body.content
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
};

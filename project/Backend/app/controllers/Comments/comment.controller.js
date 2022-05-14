const Comment = require('../../models/comment.model');

const Check = require('../checks');
const { ensureTitle, ensureDescription } = require('./checks');

// POST a Comment
exports.create = (req, res) => {
  const checks = (new Check(req, res))
    .addCheck(ensureTitle, 'Improper title given')
    .addCheck(ensureDescription, 'Improper description given')
    .verify();

  if (checks.errors.length === 0) {
    const comment = new Comment({
      name: req.user.fullName,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      url: req.body.url,
      likes: [],
      unlikes: [],
      favorites: [],
      _author_id: req.user._id
    });

    comment.save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          message: err.message
        });
      });
  } else {
    res.status(401).json({
      success: false,
      message: checks.errors
    })
  }
};

// FETCH all Comments
exports.findAll = (req, res) => {
  const query = req.query.q;

  if (query) {
    Comment.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { title: { $regex: query, $options: 'i' } },
      ]
    }, null, {sort: {'_id': -1}})
      .then(comments => {
        res.send(comments);
      }).catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  } else {
    Comment.find(null, null, {sort: {'_id': -1}})
      .then(comments => {
        res.send(comments);
      }).catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  }
};

// GET a Comment
exports.getOne = (req, res) => {
  Comment.findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }
      res.json(comment);
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};

// GET user Comments
exports.getMine = (req, res) => {
  Comment.find({
    _author_id: req.user._id,
  }, null, {sort: {'_id': -1}})
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }
      res.json(comment);
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};

// GET user favorites Comments
exports.getFav = (req, res) => {
  Comment.find({
    favorites: { $regex: req.user._id }
  },null,{sort: {'_id': -1}})
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }
      res.json(comment);
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};

// UPDATE a Comment
exports.update = (req, res) => {
  const checks = (new Check(req, res))
    .addCheck(ensureTitle, 'Improper title given')
    .addCheck(ensureDescription, 'Improper description given')
    .verify();

  if (checks.errors.length === 0) {
    Comment.findOneAndUpdate({ _id: req.params.commentId }, {
      name: req.user.fullName,
      title: req.body.title,
      description: req.body.description,
      _author_id: req.user._id,
      active: true
    }, { new: true })
      .then(comment => {
        if (!comment) {
          return res.status(404).json({
            success: false,
            message: `Comment not found with id '${req.params.commentId}'`
          });
        }
        res.send({
          success: true,
          message: 'Comment edited successfully.',
          data: comment
        });
      }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }
      return res.status(500).json({
        success: false,
        message: `Error retrieving Comment with id '${req.params.commentId}'`
      });
    });
  } else {
    res.status(401).json({
      success: false,
      message: checks.errors
    })
  }
};

// DELETE a Comment
exports.delete = (req, res) => {
  let filter;

  if (req.user.role === 'admin') {
    filter = { _id: req.params.commentId };
  } else {
    filter = {
      $and: [
        { _id: req.params.commentId },
        { _author_id: req.user._id },
      ]
    };
  }

  Comment.findOneAndRemove(filter)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }
      res.send({
        success: true,
        message: "Comment deleted successfully!"
      });
    }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};

// LIKE a comment
exports.like = (req, res) => {
  Comment.findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }

      let newLikes = comment.likes;
      let newUnlikes = comment.unlikes.filter((unlike) => unlike !== req.user._id);

      if (comment.likes.includes(req.user._id)) {
        newLikes = newLikes.filter((like) => like !== req.user._id);
      } else newLikes.push(req.user._id)

      Comment.findOneAndUpdate({ _id: req.params.commentId }, {
        likes: newLikes,
        unlikes: newUnlikes,
        active: true
      }, { new: true })
        .then(comment => {
          res.send({
            success: true,
            data: comment
          });
        });
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};


// UNLIKE a comment
exports.unlike = (req, res) => {
  Comment.findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }

      let newLikes = comment.likes.filter((like) => like !== req.user._id);
      let newUnlikes = comment.unlikes;

      if (comment.unlikes.includes(req.user._id)) {
        newUnlikes = newUnlikes.filter((unlike) => unlike !== req.user._id)
      } else newUnlikes.push(req.user._id)

      Comment.findOneAndUpdate({ _id: req.params.commentId }, {
        likes: newLikes,
        unlikes: newUnlikes,
        active: true
      }, { new: true })
        .then(comment => {
          res.send({
            success: true,
            data: comment
          });
        });
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};


// TOGGLE FAVORITE a comment
exports.toggleFavorite = (req, res) => {
  Comment.findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }

      let newFavorites = comment.favorites;

      newFavorites.push(req.user._id)

      Comment.findOneAndUpdate({ _id: req.params.commentId }, {
        favorites: newFavorites,
        active: true
      }, { new: true })
        .then(comment => {
          res.send({
            success: true,
            data: comment
          });
        });
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};

// TOGGLE FAVORITE a comment
exports.toggleFavoritedown = (req, res) => {
  Comment.findById(req.params.commentId)
    .then(comment => {
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: `Comment not found with id '${req.params.commentId}'`
        });
      }

      let newFavorites = comment.favorites;

      if (comment.favorites.includes(req.user._id)) {
        newFavorites = newFavorites.filter((favorite) => favorite !== req.user._id)
      }
      Comment.findOneAndUpdate({ _id: req.params.commentId }, {
        favorites: newFavorites,
        active: true
      }, { new: true })
        .then(comment => {
          res.send({
            success: true,
            data: comment
          });
        });
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Comment not found with id '${req.params.commentId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.commentId}'`
    });
  });
};

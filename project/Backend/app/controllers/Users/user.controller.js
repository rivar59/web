const User = require('../../models/user.model');

// FETCH all users
exports.findAll = (req, res) => {
  const query = req.query.q;

  if (query) {
    User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ]
    }, null, {sort: {'createdOn': -1}})
      .then(comments => {
        res.send(comments);
      }).catch(err => {
      res.status(500).json({
        success: false,
        message: err.message
      });
    });
  } else {
    User.find(null, null, {sort: {'createdOn': -1}})
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

// BAN a user
exports.ban = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found with id '${req.params.userId}'`
        });
      }

      User.findOneAndUpdate({ _id: req.params.userId }, {
        role: 'banned',
        active: true
      }, { new: true })
        .then(user => {
          User.find(null, null, {sort: {'_id': -1}})
            .then(users => res.send(users))
            .catch(err => {
              res.status(500).json({
                success: false,
                message: err.message,
              });
            });
        });
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `User not found with id '${req.params.userId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.userId}'`
    });
  });
};

// UNBAN a user
exports.unban = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `User not found with id '${req.params.userId}'`
        });
      }

      User.findOneAndUpdate({ _id: req.params.userId }, {
        role: 'user',
        active: true
      }, { new: true })
        .then(user => {
          User.find(null, null, {sort: {'_id': -1}})
            .then(users => res.send(users))
            .catch(err => {
              res.status(500).json({
                success: false,
                message: err.message
              });
            });
        });
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `User not found with id '${req.params.userId}'`
      });
    }
    return res.status(500).json({
      success: false,
      message: `Error retrieving Comment with id '${req.params.userId}'`
    });
  });
};

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Check = require('../checks');
const {
  ensureFullName,
  ensureEmail,
  ensurePassword,
  ensurePasswords
} = require('./checks');

const config = require('../../config/auth.config');
const User = require('../../models/user.model');

exports.register = (req, res) => {
  const checks = (new Check(req, res))
    .addCheck(ensureFullName, 'Improper full name given')
    .addCheck(ensureEmail, 'Improper email given')
    .addCheck(ensurePasswords, 'Passwords does not match')
    .verify();

  if (checks.errors.length === 0) {
    const body = {role: 'user', ...req.body}

    let newUser = new User(body);
    newUser.hash_password = bcrypt.hashSync(body.password1, 12);

    newUser.save((err, user) => {
      if (err) {
        res.status(500).send("There was a problem registering the user.");
      }
      // noinspection JSCheckFunctionSignatures
      let token = jwt.sign(
        {
          email: user.email,
          fullName: user.fullName,
          _id: user._id,
          role: user.role
        },
        config.secret,
        { expiresIn: 86400 }, // 24h
      );
      res.status(200).send({
        auth: true,
        token: token,
        user: user
      });
    });
  } else {
    res.status(401).json({
      success: false,
      message: checks.errors
    })
  }
};

exports.login = (req, res) => {
  const checks = (new Check(req, res))
    .addCheck(ensureEmail, 'Improper email given')
    .addCheck(ensurePassword, 'Improper password given')
    .verify();

  if (checks.errors.length === 0) {
    User.findOne({
      email: req.body.email
    }, (err, user) => {
      if (err) throw err;
      if (user && user.comparePassword(req.body.password)) {
        // noinspection JSCheckFunctionSignatures
        res.json({
          token: jwt.sign(
            {
              email: user.email,
              fullName: user.fullName,
              _id: user._id,
              role: user.role
            },
            config.secret,
            { expiresIn: 86400 }
          )
        });
      } else {
        res.status(401).json({
            success: false,
            message: 'Authentication failed. Wrong username or password.'
          });
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: checks.errors
    })
  }
};

exports.loginRequired = (req, res, next) => {
  if (req.user) next();
  else res.status(401).json({ message: 'Unauthorized user!' });
};

exports.isNotBanned = (req, res, next) => {
  if (req.user && req.user.role !== 'banned') next();
  else res.status(401).json({ message: 'Unauthorized user!' });
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(401).json({ message: 'Unauthorized user!' });
};

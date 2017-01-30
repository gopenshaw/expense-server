var bcrypt = require('bcrypt');
var jsonWebToken = require('jsonwebtoken');
var User = require('./models/user');

const saltRounds = 10;

exports.addUser = function(user, callback) {
  User.findOne({ 'name': user.name }, 'name', function (err, person) {
    if (person) {
      callback({"message": "user already exists"});
      return;
    }

    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      var newUser = User({
        name: user.name,
        hash: hash,
        isAdmin: false
      });

      newUser.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        callback();
      });
    });
  });
}

exports.findUsers = function(callback) {
  User.find({}, function(err, users) {
    callback(users);;
  });
}

exports.authenticateUser = function(req, callback) {
  User.findOne({ 'name': req.body.name }, 'name hash isAdmin', function (err, person) {
    if (!person) {
      callback({"message": "invalid creds"});
      return;
    }

    bcrypt.compare(req.body.password, person.hash, function(err, res) {
      if (res !== true) {
        callback({"message": "invalid creds"});
        return;
      }

      var token = jsonWebToken.sign({"name": req.body.name}, req.app.get('tokenSecret'), {
        expiresIn: "1d"
      });

      callback(null, token, person.isAdmin);
    });
  });
}

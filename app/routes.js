var userRepository = require('./user-repository')

exports.postUsers = function(req, res) {
  if (!req.body.name) {
    res.status(422).send({"message": "name required"});
  }
  else if (!req.body.password) {
    res.status(422).send({"message": "password required"});
  }
  else {
    userRepository.addUser(req.body, function(err) {
      if (err) {
        res.status(422).send({"message": err.message});
      }
      else {
        res.json({"message": "user added"});
      }
    });
  }
}

exports.postAuthenticate = function(req, res) {
  if (!req.body.name) {
    res.status(422).send({"message": "name required"});
  }
  else if (!req.body.password) {
    res.status(422).send({"message": "password required"});
  }
  else {
    userRepository.authenticateUser(req, function(err, token) {
      if (err) {
        res.status(422).send({"message": err.message});
      }
      else {
        res.json({"token": token});
      }
    });
  }
}

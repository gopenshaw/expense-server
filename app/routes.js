var Expense = require('./models/expense');
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
    userRepository.authenticateUser(req, function(err, token, isAdmin) {
      if (err) {
        res.status(422).send({"message": err.message});
      }
      else {
        res.json({
          "token": token,
          "isAdmin": isAdmin
        });
      }
    });
  }
}

exports.postExpenses = function(req, res) {
  var expense = Expense({
    date: req.body.date,
    cost: req.body.cost,
    description: req.body.description,
    user: req.decoded.name
  });
  expense.save(function(err) {
    if (err) res.status(422).send({"message": err.message});
    else res.json(expense)
  });
}

exports.getExpenses = function(req, res) {
  Expense.find({}).select({
    date: 1,
    cost: 1,
    description: 1,
    user: 1,
    _id: 1
  }).exec(function(err, docs) {
    if (err) res.status(422).send({"message": err.message});
    else res.json({"expenses": docs});
  });
}

exports.getExpensesForUser = function(req, res) {
  var username = req.params.username
  if (username !== req.decoded.name) {
    res.status(403).send();
    return;
  }

  Expense.find({user: username}).select({
    date: 1,
    cost: 1,
    description: 1,
    user: 1,
    _id: 1
  }).exec(function(err, docs) {
    if (err) res.status(422).send({"message": err.message});
    else res.json({"expenses": docs});
  });
}

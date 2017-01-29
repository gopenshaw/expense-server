var jsonWebToken = require('jsonwebtoken');

exports.authenticate = function(req, res, next) {
  var token = req.body.token || req.query.token;
  if (!token) {
    res.status(403).send();
    return;
  }

  jsonWebToken.verify(token, req.app.get('tokenSecret'), function(err, decoded) {
    if (err) {
      res.status(403).send();
      return;
    }
    else {
      req.decoded = decoded;
      next();
    }
  });
}

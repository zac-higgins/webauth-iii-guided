const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = "is it secret, is it safe?";
    jwt.verify(authorization, secret, function (err, decodedToken) {
      if (err) {
        res.status(401).json({ message: 'Invalid token.' });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'Please login and try again.' });
  }
};
const jwt = require('jsonwebtoken');

// Authenticates and authorizes the user
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    // Token -> 'Bearer alskdgnovnowegj' 
    // The below grabs the second part of the token
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(Error('Failed to authenticate token'));
      } else {
        // Once the token is verified we add the decoded property to the request object
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(Error('No token provided'));
  }
};
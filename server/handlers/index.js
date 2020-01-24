module.exports = {
  ...require('./auth') // Allows "exports" in auth file for handlers instead of module.exports. ...
};

module.exports.notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

module.exports.errors = (err, req, res, next) => {
  res.status(err.status || 400).json({
    err: err.message || 'Something went wrong'
  });
};
const db = require('../models');

exports.register = async (req, res, next) => {
  try {
    // Create a new User
    const user = await db.User.create(req.body);
    const { id, username } = user;

    // What the user gets back from the post request
    res.json({id, username});
  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if(valid) {
      res.json({
        id,
        username
      });
    } else {
      throw new Error('Invalid Username/Password');
    }
  } catch (error) {
    next(error);
  }
}
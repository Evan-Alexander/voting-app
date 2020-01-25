const db = require('../models');

// SHOW ALL POLLS
exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find()
      .populate('user', ['username', 'id']);
    res.status(200).json(polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// SHOW ALL THE USERs POLLS
exports.usersPolls = async (req, res, next) => {
  try {
    const { id } = req.decoded;
    const user = await db.User.findById(id)
      .populate('polls');
    res.status(200).json(user.polls);
  } catch (error) {
    error.status = 400;
    next(err);
  }
};

// CREATE A POLL
exports.createPoll = async (req, res, next) => {
  try {
    console.log(req.decoded);
    const { id } = req.decoded;
    const user = await db.User.findById(id);
    const { question, options } = req.body;

    // Create a new question
    // within the options -> we get a vote counter, id, and the actual string of the option as well
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({
        option,
        votes: 0
      }))
    });
    // Assign the user poll property the poll id that they created
    user.polls.push(poll._id);
    await user.save();
    // _doc is a mongoose shorthand for grabbing the whole poll document
    res.status(201).json({
      ...poll._doc, 
      user: user._id
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// GET A SINGLE POLL
exports.getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const poll = await db.Poll.findById(id)
      .populate('user', ['username', 'id']);
    
    if (!poll) throw new Error('No poll found');

    res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// DELETE A POLL
exports.deletePoll = async (req, res, next) => {
  try {
    const {id: pollId} = req.params;
    const {id: userId} = req.decoded;

    const poll = await db.Poll.findById(pollId);

    if (!poll) throw new Error('No poll found');
    if (poll.user.toString() !== userId) {
      throw new Error('Unauthorized access');
    }
    await poll.remove();
    res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// CAST A VOTE
exports.vote = async (req, res, next) => {
  try {
    const {id: pollId} = req.params;
    const {id: userId} = req.decoded;
    const { answer } = req.body;

    if (answer) {
      const poll = await db.Poll.findById(pollId);
      if (!poll) throw new Error('No poll found');

      // When a vote occurs we loop through the options of that poll, if it is the answer we add 1 to the votes property.  If it isn't the answer we just return the option.
      const vote = poll.options.map(option => {
        if (option.option === answer) {
          return {
            option: option.option,
            _id: option._id,
            votes: option.votes + 1
          };
        } else {
          return option;
        }
      });

      // Compare the current user voting -> if the array provided by the filter method is less than 0, it means the user hasn't voted yet.
      if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
        poll.voted.push(userId);
        poll.options = vote;
        await poll.save();

        res.status(202).json(poll);
      } else {
        throw new Error('Already voted');
      }
    } else {
      throw new Error('No answer provided');
    }
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // update a user
  updateUser(req,res) {
    User.findOneAndUpdate(
      {id: req.params.userId},
      {$set:req.body},
    )
    .then((user) =>res.json(user))
    .catch((err) => res.status(500).json(err))
  },

  //delete a user
  deleteUser(req,res) {
    User.findOneAndRemove(
      
      {id: req.params.userId},
    )
    .then((user) =>res.json(user))
    .catch((err) => res.status(500).json(err))
  },

  //Add a friend
  addFriend(req,res) {
    User.findOneAndUpdate(
      {id: req.params.userId},
      {$addToSet:{friends:req.params.friendId}},
    )
    .then((user) =>res.json(user))
    .catch((err) => res.status(500).json(err))
  },

  //remove a Friend

  removeFriend(req,res) {
    User.findOneAndUpdate(
      {id: req.params.userId},
      {$pull:{friends:req.params.friendId}},
    )
    .then((user) =>res.json(user))
    .catch((err) => res.status(500).json(err))
  }

};

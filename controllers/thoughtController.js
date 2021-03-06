const { User, Thought } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((t) => res.json(t))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((t) =>
        !t
          ? res.status(404).json({ message: 'No Thought with that ID' })
          : res.json(t)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((t) => {
        console.log(t)
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: {thoughts: t._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((t) =>
        !t
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(t)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((t) =>
        !t
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Thought deleted but no user with this id!' })
          : res.json({ message: 'Thought successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a thought response
  addThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((t) =>
        !t
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(t)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thought response
  removeThoughtReaction(req, res) {
    console.log(req)
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((t) =>
        !t
          ? res.status(404).json({ message: 'No thoughts with this id!' })
          : res.json(t)
      )
      .catch((err) => res.status(500).json(err));
  },
};

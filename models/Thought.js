const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment')

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength:280,
    },

    // create Virtual for formatting of date
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

  thoughtSchema
  .virtual('dateFormat')
  // Getter
  .get(function () {
    return moment(this.createdAt).format('MMMM Do YYYY');
  });

// Initialize our Video model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

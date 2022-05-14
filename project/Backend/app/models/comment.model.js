const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  unlikes: {
    type: Array,
    default: []
  },
  favorites: {
    type: Array,
    default: []
  },
  active: {
    type: Boolean,
    default: false
  },
  _author_id: {
    type: String,
    required: true
  },
});

CommentSchema.method("toJSON", function() {
  const { __v, _id, _author_id, ...object } = this.toObject();
  object.id = _id;
  object.author = _author_id;

  return object;
});

module.exports = mongoose.model('Comment', CommentSchema);

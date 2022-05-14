const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: int,
    required: true
  },
  rating: {
    type: int,
    default: 0
  },
});

CommentSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  return object;
});

module.exports = mongoose.model('Object', CommentSchema);

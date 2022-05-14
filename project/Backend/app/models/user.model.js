const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  basket: {
    type: Array,
    default: []
  },
  alreadyordered: {
    type: Array,
    default: []
  }
});

UserSchema.methods.comparePassword = function(password){
  return bcryptjs.compareSync(password, this.hash_password);
}

UserSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;

  delete object.hash_password;

  return object;
});

module.exports = mongoose.model('User', UserSchema);

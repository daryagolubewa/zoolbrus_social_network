const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  company: String,
  groupName: String,
  links: Array,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const User = mongoose.model('User', userSchema);

export default User;

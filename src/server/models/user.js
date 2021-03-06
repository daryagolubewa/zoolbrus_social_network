const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zoolbrus');

const userSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  email: String,
  password: String,
  role: String,
  company: String,
  description: String,
  groupName: String,
  links: Array,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

const User = mongoose.model('User', userSchema);


export default User;

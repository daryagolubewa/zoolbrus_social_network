const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const postSchema = new mongoose.Schema({
  text: String,
  createdAt: Date
});

const Post = mongoose.model('Post', postSchema);

export default Post;

import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user';
import { usersArr } from './constants/test-users';
import { createJWToken } from './libs/auth';
import config from './config/default';

// import Post from './models/post'
import Message from './models/message';

const saltRounds = 10;

mongoose.connect('mongodb://localhost/zoolbrus');

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});

router.get('/posts', (req, res) => {
  setTimeout(() => res.send([
    { id: 1, title: 'First Post', description: 'The very best first post...' },
    { id: 2, title: 'Second Post', description: 'Dirty post :(' }
  ]), 1000);
});

router.post('/login', async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });
  if (currentUser) {
    const token = createJWToken(currentUser);
    res.cookie(config.jwt.token, token, config.jwt.cookieOptions);
    res.send(currentUser);
  } else {
    res.status(401);
    res.send('401 UNAUTHORIZED');
  }
});

router.post('/users/create', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user == null) {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      role: 'user',
      company: '',
      groupName: '',
      links: [],
      messages: []
    });
    await user.save();
    res.send(200, 'Success');
  } else {
    res.send(400, 'Email already in use');
  }
});

router.post('/test', async (req, res) => {
  const user = await User.findOne({ name: req.body.sender });
  res.json({ user });
});

router.post('/mes', async (req, res) => {
  const sender = await User.findById(req.body.sender);
  const receiver = await User.findById(req.body.receiver);
  const msg = new Message({
    text: req.body.text,
    sender,
    receiver,
    createdAt: Date.now()
  });
  await msg.save();
});


router.post('/messages', async (req, res) => {
  const msgs = await Message.find({ sender: req.body.sender, receiver: req.body.receiver });
  const msgsRev = await Message.find({ sender: req.body.receiver, receiver: req.body.sender });
  const allMsg = msgs.concat(msgsRev);
  allMsg.sort((a, b) => b.createdAt - a.createdAt);
  res.json({ msgs: allMsg.reverse() });
});

export default router;

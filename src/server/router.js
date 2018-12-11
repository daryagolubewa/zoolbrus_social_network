import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user';
// import Post from './models/post'
// import Message from './models/message'
const saltRounds = 10;


mongoose.connect('mongodb://localhost/zoolbrus');

const router = express.Router();

router.get('/user', (req, res) => {
  setTimeout(() => res.send({
    name: 'Michael',
    email: 'mk@elbrusboot.camp'
  }), 1000);
});

router.get('/posts', (req, res) => {
  setTimeout(() => res.send([
    { id: 1, title: 'First Post', description: 'The very best first post...' },
    { id: 2, title: 'Second Post', description: 'Dirty post :(' }
  ]), 1000);
});

const usersArr = [
  { email: 'mk@elbrusboot.camp', name: 'Michael Klishevich' },
  { email: 'test@test.com', name: 'John King' }
];

router.post('/login', (req, res) => {
  console.log(JSON.stringify(req.body));
  const requestUserEmail = req.body.email;
  const currentUser = usersArr.filter(el => el.email === requestUserEmail)[0];
  console.log('currentUser', currentUser);
  setTimeout(() => {
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.status(401);
      res.send('401 UNAUTHORIZED');
    }
  }, 1000);
});

router.post('/users/create', async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
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

export default router;

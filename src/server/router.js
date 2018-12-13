import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user';
import { usersArr } from './constants/test-users';
import { createJWToken } from './libs/auth';
import config from './config/default';
import sendEmail from './middlewares/send-email';

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

router.post('/login', (req, res) => {
  const requestUserEmail = req.body.email;
  const currentUser = usersArr.filter(el => el.email === requestUserEmail)[0];
  setTimeout(() => {
    if (currentUser) {
      const token = createJWToken(currentUser);
      res.cookie(config.jwt.token, token, config.jwt.cookieOptions);
      res.send(currentUser);
    } else {
      res.status(401);
      res.send('401 UNAUTHORIZED');
    }
  }, 1000);
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
    const signup = true;
    sendEmail(req, signup);
    res.send(200, 'Success');
  } else {
    res.send(400, 'Email already in use');
  }
});

router.post('/profile', async (req, res) => {
  const userProfile = await User.findOne({ email: req.body.email });
  res.send({ userProfile });
});

router.post('/users/:id', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.send({ user });
});

router.post('/profile/change', async (req, res) => {
  const user = await User.findOneAndUpdate(
    {
      email: req.body.email
    },
    {
      $set: {
        company: req.body.company
      }
    }
  );
  await user.save();

  res.send(200);
});

router.post('/profile/addlink', async (req, res) => {
  const user = await User.findOneAndUpdate(
    {
      email: req.body.email
    },
    {
      $set: {
        links: req.body.links
      }
    }
  );
  await user.save();
  res.send(200);
});

router.post('/profile/deletelink', async (req, res) => {
  const user = await User.findOneAndUpdate(
    {
      email: req.body.email
    },
    {
      $set: {
        links: req.body.newLinks
      }
    }
  );
  await user.save();

  res.send(200);
});

router.post('/feedback', async (req, res) => {
  const signup = false;
  sendEmail(req, signup);
  res.send(200);
});

export default router;

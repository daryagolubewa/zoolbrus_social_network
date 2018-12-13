import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user';
import { usersArr } from './constants/test-users';
import { createJWToken } from './libs/auth';
import config from './config/default';

// const faker = require('faker');
// import Post from './models/post'
// import Message from './models/message'
const saltRounds = 10;

mongoose.connect('mongodb://localhost/zoolbrus');

const router = express.Router();

router.post('/login', async (req, res) => {
  // const newUsers = new User({
  //   name: faker.name.findName(),
  //   email: faker.internet.email(),
  //   password: faker.internet.password(),
  //   role: 'student',
  //   company: faker.company.companyName()
  // });
  // await newUsers.save();
  // console.log(newUsers);
  // console.log(JSON.stringify(req.body));
  // await seed();
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
  if (user === null) {
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

// router.get('/seed', async (req, res) => {
//   for (let i = 0; i < 50; i + i) {
//     const newUsers = new User({
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       role: 'student',
//       company: faker.company.companyName()
//     });
//     // await newUsers.save();
//   }
//   res.send('dfdf');
// });

router.get('/x', (req, res) => {
  res.send('Hello');
});

router.post('/users/teachers', async (req, res) => {
  const teachers = await User.find({ role: 'teacher' });
  if (teachers === null) {
    return res.send(400, 'No teachers found');
  }
  return res.json(teachers);
});


export default router;

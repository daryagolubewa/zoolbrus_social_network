import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user';
import { createJWToken } from './libs/auth';
import config from './config/default';
import sendEmail from './middlewares/send-email';
import { verifyJwtMW } from './middlewares/verify-jwt';

const faker = require('faker');
// import Post from './models/post'
import Message from './models/message';

const saltRounds = 10;

mongoose.connect('mongodb://localhost/zoolbrus');

const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});


router.post('/login', async (req, res) => {
  const currentUser = await User.findOne({ email: req.body.email });
  if (currentUser) {
    if (bcrypt.compare(req.body.password, currentUser.password)) {
      const token = createJWToken(currentUser);
      res.cookie(config.jwt.token, token, config.jwt.cookieOptions);
      res.send(currentUser);
    }
  } else {
    res.status(401);
    res.send('401 UNAUTHORIZED');
  }
});

router.post('/users/create', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user === null) {
    user = new User({
      avatar: '',
      discription: '',
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


router.post('/test', async (req, res) => {
  const user = await User.findOne({ name: req.body.sender });
  res.json({ user });
});

router.post('/mes', async (req) => {
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
})


// router.get('/seed', async (req, res) => {
//   for (let i = 0; i < 50; i++) {
//     const newUsers = new User({
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       avatar: faker.image.avatar(),
//       password: faker.internet.password(),
//       role: 'teacher',
//       company: faker.company.companyName()
//     });
//     await newUsers.save();
//   }
//   console.log(1111111111111111)
//   res.send('dfdf');
// });

router.post('/users/teachers', async (req, res) => {
  const teachers = await User.find({ role: 'teacher' });
  if (teachers === null) {
    return res.send(400, 'No teachers found');
  }
  return res.json(teachers);
});

router.post('/users/students', async (req, res) => {
  const students = await User.find({ role: 'student' }).skip(req.body.currentPage).limit(req.body.studentsLimit);
  if (students.length === 0) {
    return res.send(400, 'No students found');
  }
  return res.json(students);
});

router.post('/profile', async (req, res) => {
  const userProfile = await User.findById(req.body.id);
  res.send({ userProfile });
});

router.post('/users/id', async (req, res) => {
  const user = await User.findById(req.body.id);
  res.send({ user });
});

router.post('/profile/change', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        company: req.body.company,
        discription: req.body.discription
      }
    }
  );
  await user.save();

  res.send(200);
});

router.post('/profile/addlink', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.id,
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
  const user = await User.findByIdAndUpdate(
    req.body.id,
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

router.post('/users/:id/changerole', async (req, res) => {
  console.log('1111111111111111111111111111')
  const user = await User.findOneAndUpdate(
    {
      email: req.body.email
    },
    {
      $set: {
        role: req.body.role
      }
    }
  );
  await user.save();
  res.send(200);
});


router.get('/isauth', async (req, res, next) => {
  verifyJwtMW
  console.log(req.user);

  res.json(req.user)
})
export default router;

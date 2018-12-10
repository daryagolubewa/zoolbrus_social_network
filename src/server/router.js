import express from 'express';

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
  { login: 'mike', name: 'Michael Klishevich' },
  { login: 'john', name: 'John King' }
];

router.post('/login', (req, res) => {
  console.log(JSON.stringify(req.body));
  const requestUser = req.body.login;
  const currentUser = usersArr.filter(el => el.login === requestUser)[0];
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

export default router;

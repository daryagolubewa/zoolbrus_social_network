import fs from 'fs';
import express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';
import handlebars from 'handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import socketIO from 'socket.io';
import config from './config/default';
import router from './router';
import { verifyJwtMW } from './middlewares/verify-jwt';

const fetch = require('node-fetch');


const app = express();
app.use(cookieParser(config.jwt.secret));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const { buildConfig: { assetsDir, targetDir }, server: { port }, proxyAssets } = config;

app.all('*', verifyJwtMW);

if (config.appModeDev) {
  app.use(
    `/${assetsDir}`,
    proxy({ target: `http://${proxyAssets.host}:${proxyAssets.port}`, changeOrigin: true }),
  );
} else {
  app.use(
    `/${assetsDir}`,
    express.static(path.join(process.cwd(), targetDir, 'client')),
  );
}


app.use('/api', router);

app.use('*', (req, res) => {
  const template = handlebars.compile(fs.readFileSync(
    path.join(__dirname, 'index.hbs'),
    'utf8',
  ));
  const context = {
    title: 'Express React Skeleton'
  };
  res.send(template(context));
});


const io = socketIO.listen(app.listen(port, () => console.log(`Example app listening on port ${port}!`)));

let userCur;


io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('send message', async (message) => {
    const response = await fetch('http://localhost:3000/api/mes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: message.sender,
        receiver: message.receiver,
        text: message.text
      })
    });
    userCur = { ...message };
    // response = await response.json()
    // socket.emit('mesArr', {text:message})
  });

  socket.on('refresh', async (user) => {
    let response = await fetch('http://127.0.0.1:3000/api/messages', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: user.sender,
        receiver: user.receiver
      })
    });
    response = await response.json();
    socket.emit('msgs', response.msgs);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

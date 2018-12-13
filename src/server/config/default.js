const appId = 'express-react-skeleton';
const appModeDev = process.env.APP_MODE_DEV === '1';
const env = process.env.NODE_ENV || 'localhost';
const host = process.env.HOST || '0.0.0.0';
console.log('appModeDev', appModeDev); // eslint-disable-line
console.log('env', env); // eslint-disable-line
console.log('host', host); // eslint-disable-line

const config = {
  appId,
  appModeDev,
  env,
  basePath: '',

  buildConfig: {
    targetDir: '.build',
    assetsDir: 'assets'
  },

  proxyAssets: {
    host: 'localhost',
    port: 9090
  },

  jwt: {
    secret: 'someSecret',
    token: 'jwt-token',
    cookieOptions: {
      maxAge: 1000 * 60 * 30, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: true // Indicates if the cookie should be signed
    },
    notVerifyPages: [
      '/',
      '/login',
      '/signup',
      '/api/login',
      '/api/users/create',
      '/api/mes',
      '/api/messages'
    ]
  },

  server: {
    host,
    port: 3000
  }
};

export default config;

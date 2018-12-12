import { verifyJWTToken } from '../libs/auth';
import config from '../config/default';

export async function verifyJwtMW(req, res, next) {
  if (config.jwt.notVerifyPages.includes(req.url) || req.url.includes('/assets/')) {
    next();
  } else {
    console.log('req method', req.method);
    console.log('req url', req.url);
    console.log('Signed Cookies: ', req.signedCookies);
    const token = req.signedCookies[config.jwt.token];
    try {
      const decodedToken = await verifyJWTToken(token);
      req.user = decodedToken.data;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid auth token provided.' });
    }
  }
}

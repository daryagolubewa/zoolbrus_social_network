import { verifyJWTToken } from '../libs/auth';
import config from '../config/default';

export async function verifyJwtMW(req, res, next) {
  if (config.jwt.notVerifyPages.includes(req.url) || req.url.includes('/assets/')) {
    next();
  } else {
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

import jwt from 'jsonwebtoken';
import config from '../config/default';

export function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decodedToken) => {
      if (err || !decodedToken) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
}

export function createJWToken(data) {
  console.log(data, data);
  return jwt.sign({
    data
  }, config.jwt.secret, {
    expiresIn: config.jwt.cookieOptions.maxAge,
    algorithm: 'HS256'
  });
}

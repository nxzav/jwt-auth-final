import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export function issueJWT(user) {
  const _id = user._id;
  const expiresIn = '1h';
  const payload = {
    sub: _id,
    iat: Date.now(),
  };
  const jwtSecret = config.jwtSecret;

  const signedToken = jwt.sign(payload, jwtSecret, { expiresIn: expiresIn });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hash(password, salt);
  return hashedPassword;
}

export function verifyPassword(hashedPassword, password) {
  return bcrypt.compareSync(password, hashedPassword);
}

export function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({success: false, msg: 'Token not provided'});
  }

  try {
    const validUser = jwt.verify(token, config.jwtSecret);
    req.user = validUser.sub;
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: 'You are not authorized to visit this route' });
  }
}

export function isLogged(req, res, next) {
  if (req.cookies.token === undefined) {
    next();
  } else {
    res.redirect('/profile');
  }
}

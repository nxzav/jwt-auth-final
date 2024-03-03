import UserService from '../mongo/user.mongo.js';
import { hashPassword, issueJWT, verifyPassword } from '../lib/utils.js';

export const home = (req, res) => res.render('index', {});
export const login = (req, res) => res.render('login', {});
export const register = (req, res) => res.render('register', {});
export const protectedRoute = (req, res) => res.render('protected', {});
export const postRegister = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await UserService.getUserByEmail(email);
  if (userExists) {
    return res.status(409).json({ success: false, msg: 'User already exists' });
  } else {
    try {
      const newUser = await UserService.createUser({
        email: email,
        password: await hashPassword(password),
      });

      const jwt = issueJWT(newUser);

      res.json({
        success: true,
        user: newUser,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    } catch (err) {
      res.status(401).json({ success: false, msg: 'Error, ' + err });
    }
  }
};

export const postLogin = (req, res) => {
  const { email, password } = req.body;
  UserService.getUserByEmail(email)
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'Could not find user' });
      }

      const isValid = verifyPassword(user.password, password);

      if (typeof isValid === 'boolean' && isValid === true) {
        const tokenObject = issueJWT(user);

        res.cookie('token', tokenObject.token, {
          httpOnly: true,
          maxAge: 3600000,
        });

        res.redirect('/protected');
      } else {
        res
          .status(401)
          .json({ success: false, msg: 'Wrong email or password' });
      }
    })
    .catch((err) => {
      res.status(401).json({ success: false, msg: 'Log in error: ' + err });
    });
};

export const profile = async (req, res) => {
  const user = await UserService.getUserById(req.user);
  res.render('profile', user);
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

const { Router } = require('express');
const UserService = require('../services/UserService');
//const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user =  await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/signin', async (req, res, next) => {
    try {
      const user = await UserService.signIn(req.body);

      res.cookie(process.env.COOKIE_NAME, user.authToken(), {
        httpOnly: true,

      })
        .send({ user });
    } catch (error) {
      next(error);
    }
  })

  .delete('/sessions', (req, res) => {
    res.clearCookie(process.COOKIE_NAME)
      .json({ success: true, message: 'Signed out' });
  })
  
;

const jwt = require('jsonwebtoken');

module.exprots = (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    error.message = 'Must be signed in';
    error.status = 401;
    next(error);
  }
};

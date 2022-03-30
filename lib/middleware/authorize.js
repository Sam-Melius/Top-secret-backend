module.exports = (req, res, next) => {
  try {
    if (req.user.email !== '@defense.gov') throw new Error('Not Authorized');
    next();
  } catch (error) {
    error.status = 403;
    next(error);
  }
};

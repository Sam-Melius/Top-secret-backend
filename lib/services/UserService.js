const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = class UserService {
  static async create({ email, password }) {
    const passHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.insert({
      email,
      passHash,
    });
  }

  static async signIn({ email, password }) {
    const user = await User.getUser(email);
    if (!user) throw new Error('invalid email/password');
    const matchPass = bcrypt.compareSync(password, user.passHash);
    if (!matchPass) throw new Error('invalid email/password');

    return user;
  }


};

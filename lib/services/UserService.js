const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports = class UserService {
  static async create({ username, password }) {
    const passHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return User.insert({
      username,
      passHash
    });
  }

  static async signIn({ username, password }) {
    const user = await User.getUser(username);
    if (!user) throw new Error('invalid username/password');
    const matchPass = bcrypt.compareSync(password, user.passHash);
    if (!matchPass) throw new Error('invalid username/password');

    return user;
  }


};

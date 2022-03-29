const User = require('../models/User');
const bcrypt = require('bcryptjs');

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


  
};

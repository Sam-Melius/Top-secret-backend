const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  email;
  #passHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.#passHash = row.pass_hash;
  }

  static async insert({ email, passHash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        users (email, pass_hash)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [email, passHash]
    );
    return new User(rows[0]);
  }

  static async getUser(email) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
        `,
      [email]
    );
    if(!rows[0]) return null;
    return new User(rows[0]);
  }

  get passHash() {
    return this.#passHash;
  }

  set passHash(newHash) {
    this.#passHash = newHash;
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, {
      
    });
  }

};

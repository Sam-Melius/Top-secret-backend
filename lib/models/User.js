const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
  id;
  username;
  #passHash;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.#passHash = row.pass_hash;
  }

  static async insert({ username, passHash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        users (username, pass_hash)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [username, passHash]
    );
    return new User(rows[0]);
  }

  static async getUser(username) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        username=$1
        `,
      [username]
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

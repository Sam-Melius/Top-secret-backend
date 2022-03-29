const pool = require('../utils/pool');

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

};

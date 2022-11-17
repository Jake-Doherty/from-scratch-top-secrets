const pool = require('../utils/pool.js');

module.exports = class User {
  id;
  firstName;
  lastName;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ firstName, lastName, email, passwordHash }) {
    const { rows } = await pool.query(
      `
		insert into
			users (first_name, last_name, email, password_hash)
		values
			($1, $2, $3, $4)
		returning
			*
		`,
      [firstName, lastName, email, passwordHash]
    );
    return new User(rows[0]);
  }
};

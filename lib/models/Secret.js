const pool = require('../utils/pool.js');

module.exports = class Secret {
  id;
  title;
  description;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.created_at = row.created_at;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      select
        *
      from
        secrets
      `
    );
    return rows.map((row) => new Secret(row));
  }

  static async insert(secret) {
    const { rows } = await pool.query(
      `
		insert into
			secrets (title, description, created_at)
		values
			($1, $2, $3)
		returning
			*
		`,
      [secret.title, secret.description, secret.created_at]
    );

    return new Secret(rows[0]);
  }
};

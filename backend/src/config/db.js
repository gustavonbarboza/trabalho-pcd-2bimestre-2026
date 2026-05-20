const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'petz',
  port: 5432,
});

module.exports = pool;

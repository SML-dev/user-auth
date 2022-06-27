import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  database: 'auth_user',
  namedPlaceholders: true,
  decimalNumbers: true,
});

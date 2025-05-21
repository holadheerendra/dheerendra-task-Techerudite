import pool from '../config/db.js';

export const createUser = async (user) => {
  const [result] = await pool.query(
    'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
    [user.first_name, user.last_name, user.email, user.password]
  );
  return result.insertId;
};

export const getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};



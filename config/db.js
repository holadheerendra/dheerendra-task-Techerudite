import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Test the connection
  const connection = await pool.getConnection();
  console.log("✅ Database connected successfully!");
  connection.release(); // release to pool

} catch (err) {
  console.error("❌ Database connection failed:", err.message);
  process.exit(1); // stop the app if DB fails
}

export default pool;


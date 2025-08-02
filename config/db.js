const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres.xowgizalxhrojkwajsno:Kieutanquoc3554@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("✅ Kết nối PostgreSQL thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối PostgreSQL:", err.message));

module.exports = pool;

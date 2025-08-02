const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT t.*, u.fullname 
      FROM technicians t 
      JOIN users u ON t.user_id = u.id
    `);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user.id, username: user.username, fullname: user.fullname },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

const register = async (req, res) => {
  const { username, password, fullname, skill_set, shift } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Thiếu thông tin tài khoản" });
  }
  try {
    const checkUser = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (checkUser.rows.length > 0) {
      return res.status(409).json({ message: "Tên đăng nhập đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUser = await db.query(
      `INSERT INTO users (username, password, fullname)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [username, hashedPassword, fullname || ""]
    );

    const userId = insertUser.rows[0].id;

    await db.query(
      `INSERT INTO technicians (user_id, skill_set, shift)
       VALUES ($1, $2, $3)`,
      [userId, skill_set || "", shift || "Morning"]
    );

    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = { getAll, login, register };

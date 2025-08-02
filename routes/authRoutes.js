// routes/authRoute.js
const express = require("express");
const { login, register, getAll } = require("../controllers/authController");

const router = express.Router();

router.get("/", getAll);
router.post("/login", login);
router.post("/register", register);

module.exports = router;

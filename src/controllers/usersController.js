const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
const argon2 = require("argon2");

const listAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserByID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["users", "user_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const createUser = async (req, res) => {
  let { user_name, first_name, last_name, email, age, user_password } =
    req.body;
  let hash = await argon2.hash(user_password, { hashLength: 50 });

  let sql =
    "INSERT INTO users(user_name, first_name, last_name, email, age, user_password) VALUES (?, ?, ?, ?, ?, ? )";
  sql = mysql.format(sql, [user_name, first_name, last_name, email, age, hash]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId, results: results });
  });
};

const editUser = (req, res) => {
  const { id } = req.params;
  const { user_name, first_name, last_name, email } = req.body;
  let sql = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
  sql = mysql.format(sql, [
    "users",
    "user_name",
    user_name,
    "first_name",
    first_name,
    "last_name",
    last_name,
    "email",
    email,
    "user_id",
    id,
  ]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: "User information updated", ...req.body });
  });
};

const removeUser = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM users WHERE ?? = ?";
  sql = mysql.format(sql, ["user_id", id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `User has been removed.`, ...req.body });
  });
};

module.exports = {
  listAllUsers,
  getUserByID,
  createUser,
  editUser,
  removeUser,
};

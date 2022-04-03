const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listAllUsers = (req, res) => {
  console.log("inside of the listAllUsers function");
  res.send("this is in the list all users function!");
  pool.query("SELCT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserByID = (req, res) => {
  console.log("inside of the getUserByID function");
  const { id } = req.params;
  console.log(`Im the id ${id}`);
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["users", "user_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const createUser = (req, res) => {
  console.log("inside of the createUser function");
  let values = Object.values(req.body);
  console.log("im the values in the create users function", values);
  let sql =
    "INSERT INTO users(user_name, first_name, last_name, email, age, user_password) VALUES (?)";
  sql = mysql.format(sql, [values]);
  console.log(sql);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const editUser = (req, res) => {
  console.log("in the editUser Function");
  const { id } = req.params;
  const { user_name, first_name, last_name, email } = req.body;
  console.log(`im the ID in the edit users function ${id}`);
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
  console.log("im the sql in the edit user function", sql);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: "User information updated", ...req.body });
  });
};

// deleteUser

module.exports = {
  listAllUsers,
  getUserByID,
  createUser,
  editUser,
};

const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listAll = (req, res) => {
  console.log("in the list all function on the usersCantact controller");
  pool.query("SELECT * FROM user_contact", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getByID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["user_contact", "user_id", id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ results: results });
  });
};

const addContact = (req, res) => {
  const { user_id, users_phone1, user_phone2, address, city, state, zip } =
    req.body;

  let sql =
    "INSERT INTO user_contact(user_id, users_phone1, users_phone2, address, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?)";
  sql = mysql.format(sql, [
    user_id,
    users_phone1,
    user_phone2,
    address,
    city,
    state,
    zip,
  ]);
  console.log("SQL Statement ==>", sql);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ results: results });
  });
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const { users_phone1, users_phone2, address, city, state, zip } = req.body;
  let sql =
    "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?  WHERE ?? = ?";
  sql = mysql.format(sql, [
    "user_contact",
    "users_phone1",
    users_phone1,
    "users_phone2",
    users_phone2,
    "address",
    address,
    "city",
    city,
    "state",
    state,
    "zip",
    zip,
    "user_id",
    id,
  ]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({
      message: "User Contact information updated",
      ...req.body,
    });
  });
};

const removeContact = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM user_contact WHERE ?? = ?";
  sql = mysql.format(sql, ["user_id", id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `User Contact has been removed.`, ...req.body });
  });
};

module.exports = {
  listAll,
  getByID,
  addContact,
  updateContact,
  removeContact
};
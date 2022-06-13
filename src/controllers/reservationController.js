const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const listAllUsers = (req, res) => {
  pool.query("SELECT * FROM reservations", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getByUserID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["reservations", "user_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const getByGuestID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["reservations", "guest_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

const getByReservationID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["reservations", "reservation_id", id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    console.log(err);
    return res.json(rows);
  });
};

module.exports = {
  listAllUsers,
  getUserByID,
  createUser,
  editUser,
  removeUser,
};

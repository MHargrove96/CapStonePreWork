const mysql = require("mysql");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const createNewInvite = (req, res) => {
  const {
    user_id,
    guest_id,
    guest_first_name,
    guest_last_name,
    guest_rsvp_answer,
  } = req.body;
  let sql =
    "INSERT INTO rsvp_sent(user_id, guest_id, guest_first_name, guest_last_name, guest_rsvp_answer) VALUES (?, ?, ?, ?, ?)";
  sql = mysql.format(sql, [
    user_id,
    guest_id,
    guest_first_name,
    guest_last_name,
    guest_rsvp_answer,
  ]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ results: results });
  });
};

const listAllRsvp = (req, res) => {
  pool.query("SELECT * FROM rsvp_sent", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const listAllByUserID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["rsvp_sent", "user_id", id]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getByGuestID = (req, res) => {
  const { id } = req.params;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["rsvp_sent", "guest_id", id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ results });
  });
};

const updateInvite = (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    guest_id,
    guest_first_name,
    guest_last_name,
    guest_rsvp_answer,
  } = req.body;
  let sql = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
  sql = mysql.format(sql, [
    "rsvp_sent",
    "user_id",
    user_id,
    "guest_id",
    guest_id,
    "guest_first_name",
    guest_first_name,
    "guest_last_name",
    guest_last_name,
    "guest_rsvp_answer",
    guest_rsvp_answer,
    "guest_id",
    id,
  ]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ results });
  });
};

const removeInvite = (req, res) => {
  const { id } = req.params;
  let sql = "DELETE FROM rsvp_sent WHERE ?? = ?";
  sql = mysql.format(sql, ["guest_id", id]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.send({ Message: `User has been REMOVED.`, ...req.body });
  });
};

module.exports = {
  listAllRsvp,
  listAllByUserID,
  getByGuestID,
  createNewInvite,
  updateInvite,
  removeInvite,
};

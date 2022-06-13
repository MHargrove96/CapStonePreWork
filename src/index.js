const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const usersContactRouter = require('./routes/usersContact')
const authRouter = require("./routes/auth");
const inviteRouter = require("./routes/rsvpSent")
const port = process.env.PORT || 4001;

require("dotenv").config();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/contact-info", usersContactRouter);
app.use("/rsvp-info", inviteRouter);


app.get("/", (req, res) => {
  res.send(
    "Welcome to the server, This is the ground work for my capstone project!"
  );
});

app.listen(port, () => {
  console.log(`Web server listening on Port ${port}!`);
});

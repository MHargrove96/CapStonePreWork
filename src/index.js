const express = require("express");
const app = express();
const usersRouter = require("./routes/users")
const port = process.env.PORT || 4001;

app.use(express.json());
app.use("/users", usersRouter); 

app.get("/", (req, res) => {
    res.send("Welcome to the server, This is the ground work for my capstone project!")
});

app.listen(port, () => {
    console.log(`Web server listening on Port ${port}!`)
});
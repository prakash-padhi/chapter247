const express = require("express");
const server = express();
const path = require("path");
const cors = require("cors");
const connectMongoDB = require("./database_connect/dbConnect");

//Connect to MongoDB
connectMongoDB();

// Middleware Init
server.use(express.json({ extended: false }));
server.use(cors());

// Routes Gateway
server.use("/api/register", require("./routes/api/register"));
server.use("/api/login", require("./routes/api/login"));
server.use("/api/resetPassword", require("./routes/api/resetPassword"));
server.use("/api/checkout", require("./routes/api/handleTransactions"));

// Static assets in production
server.use(express.static(path.join(__dirname, '../client/build')));
server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'client', 'build', 'index.html'));
});

const PORT = 8080;

server.listen(PORT, function(){
    console.log("Server is running on PORT"+ " "+ PORT);
});

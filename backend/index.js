const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const config = require("./config");
const apiRouter = require("./routes/api");

// db
require("./db/mongoose");

// parsery
// content-type: application/json
app.use(bodyParser.json());

app.use("/api", apiRouter); // globalna sciezka

// server
app.listen(config.port, function () {
  console.log("serwer słucha... http://localhost:" + config.port);
});

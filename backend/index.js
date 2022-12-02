const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const config = require("./config");
const apiRouter = require("./routes/api");

const cors = require("cors");
require("./db/mongoose");

// content-type: application/json
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/api", apiRouter);

// server
app.listen(config.port, function () {
  console.log("serwer słucha... http://localhost:" + config.port);
});

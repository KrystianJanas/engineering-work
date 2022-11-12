const express = require("express");
const app = express();
const config = require("./config");

// routes
const apiRouter = require("./routes/api");

app.use("/", apiRouter); // globalna sciezka

// server
app.listen(config.port, function () {
  console.log("serwer słucha... http://localhost:" + config.port);
});

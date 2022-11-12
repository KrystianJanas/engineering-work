const express = require("express");
const app = express();
const config = require("./config");

app.get("/", function (request, response) {
  response.send("serwer działa!");
});

app.listen(config.port, function () {
  console.log("serwer słucha... http://localhost:" + config.port);
});

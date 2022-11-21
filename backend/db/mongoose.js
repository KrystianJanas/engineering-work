const mongoose = require("mongoose");
const config = require("../config");

// db connect
mongoose.connect(
  "mongodb+srv://" +
    config.database.user +
    ":" +
    config.database.password +
    "@" +
    config.database.host +
    "/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

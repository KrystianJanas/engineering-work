import { connect } from "mongoose";
import { database } from "../config.js";

// db connect
connect(
  "mongodb+srv://" +
    database.user +
    ":" +
    database.password +
    "@" +
    database.host +
    "/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log("mongoose is connected!");
  })
  .catch((error) => console.log(error));

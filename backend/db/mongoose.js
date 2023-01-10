import { connect } from "mongoose";
import { settings } from "../config.js";

connect(
  "mongodb://"+settings.host+":"+settings.port+"/"+settings.database+"?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("MongoDB is connected."))
  .catch((error) => console.log(error));

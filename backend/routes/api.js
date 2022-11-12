const express = require("express");
const test = require("../controllers/api/test");
const router = express.Router();

const testActions = require("../controllers/api/test");

router.get("/", testActions.homepage);

module.exports = router;

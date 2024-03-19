const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { DB_CONNECTION } = process.env;

mongoose.Promise = global.Promise;

const connection = mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
  });

module.exports = {
  connection,
};

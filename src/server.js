const app = require("./app");
const { connection } = require("./db/connection");
require("dotenv").config();

const { PORT } = process.env;
connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((err) => {
    console.log(err)
  });

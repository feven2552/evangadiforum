const express = require("express");
require("dotenv").config();
// const bodyParser = require("body-parser"); // Require body-parser
const cors = require("cors");
const app = express();
const port = 5500;

// db connection
const dbConnection = require("./db/dbConfige");

// user routes middleware file
const userRoutes = require("./routes/userRoute");
// questions routes middleware file
const questionRoute = require("./routes/questionRoute");

// answers routes middleware file
const answerRoute = require("./routes/answerRoute");
// middleware include
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// user router middleware
app.use("/api/users", userRoutes);

// aquestions routes middleware
app.use("/api/questions", questionRoute);
app.use("/api/answers", answerRoute);
async function start() {
  try {
    const result = await dbConnection.execute("select 'test'");
    app.listen(port);
    console.log("Database connection established");
    console.log(`Listening on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();

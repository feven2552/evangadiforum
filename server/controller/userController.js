const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
// db connection
const dbConnection = require("../db/dbConfige");

async function register(req, res) {
  const { username, firstname, email, lastname, password } = req.body;

  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username, userid from users where username = ? or email =? ",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already registered" });
    }
    if (password.length < 6) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 6 characters" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await dbConnection.query(
      "INSERT INTO users(username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    // Generate token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Expires in 1 day
    });

    // Send token in the response
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user registered", token });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(statusbar.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username,userid, password from users where email= ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "wrong password" });
    }
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    }); // Expires in 1 day

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token, username });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong , try again later" });
  }
}

async function checkuser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg: "valid user ", username, userid });
}

module.exports = { register, login, checkuser };

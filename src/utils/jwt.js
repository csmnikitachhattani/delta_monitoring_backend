const jwt = require("jsonwebtoken");

function generateJwtToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      userid: user.userid,
      username: user.username,
      usertypecode: user.usertypecode,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

module.exports = generateJwtToken;

const md5 = require("md5");
const loginRepository = require("../repositories/loginRepository");
const generateJwtToken = require("../utils/jwt");

exports.userLogin = async (req, res) => {
  try {
    const user = req.body;

    // Encrypt password (MD5 like C#)
    const pwd = user.usrpassword;
    user.usrpassword = md5(pwd);
  
    const response = await loginRepository.usrLogin(user);
    console.log(response)
    if (response) {
     // const token = generateJwtToken(response);

      const result = {
        status: true,
        userid: response.userid,
        username: response.username,
        usertypecode: response.usertypecode,
        loginusertypecd: response.loginusertypecd,
        loginusertypename: response.loginusertypename,
        userstatus: response.userstatus,
        district_name: response.district_name_text_en,
        district_code : response.district_code,
        message: "Login successful",
        isfactcheckuser: response.isfactcheckuser,
      };

      return res.status(200).json({
        result: [result],
        status: 200,
        message: "Login successfully.",
      });
    }

    // Invalid credentials (same structure)
    const failure = {
      status: false,
      userid: "",
      username: "",
      usertypecode: "",
      loginusertypecd: "",
      loginusertypename: "",
      userstatus: 0,
      message: "Invalid credentials",
    };

    return res.status(200).json({
      result: [failure],
      status: 500,
      message: "Invalid credentials",
    });
  } catch (err) {
    console.error("USRLogin error:", err);
    return res.status(500).send("An error occurred during login.");
  }
};

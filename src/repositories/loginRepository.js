const { sql, poolPromise } = require("../config/db");

async function usrLogin(user) {
  try {
    const pool = await poolPromise;
    let action;
    switch (user.usertypecode) {
      case "01":
        action = "LU";
        break;
      case "06":
        action = "LV";
        break;
      case "02":
        action = "LC";
        break;
      default:
        action = "LP";
    }
    const result = await pool
      .request()
      .input("puserid", sql.VarChar, user.userid)
      .input("pusrpwd", sql.VarChar, user.usrpassword)
      .input("loginusertypecd", sql.VarChar, user.usertypecode)
      .input("fcmtoken", sql.VarChar, "")
      .input("paction", sql.VarChar, action)
      .execute("USP_userlogin");

    return result.recordset[0] || null;
  } catch (err) {
    console.error("usrLogin error:", err);
    throw err;
  }
}

module.exports = {
  usrLogin,
};

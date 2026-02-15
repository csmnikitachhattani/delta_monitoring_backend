const { sql, poolPromise } = require("../config/db");

exports.insertDistrictDailyEntry = async (req, res) => {
  try {
    const {
      Email_Address,
      District_name,
      Date,
      Press_Releases = 0,
      Success_Stories = 0,
      Stories_Published_Nationally = 0,
      Stories_Published_on_State_Front_Page = 0,
      Facebook_Posts = 0,
      Twitter_X_Posts = 0,
      ATR___Articles_Shared = 0,
      ATR___Action_Taken = 0,
      Instagram_Posts = 0,
      Edit_Response_Link = null,
      District_id,
      user_id,
    } = req.body;

    // Basic validation
    if (!Email_Address || !District_name || !Date || !District_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const pool = await poolPromise;

    await pool.request()
      .input("Email_Address", sql.NVarChar(255), Email_Address)
      .input("District_name", sql.NVarChar(150), District_name)
      .input("Date", sql.Date, Date)
      .input("Press_Releases", sql.Int, Press_Releases)
      .input("Success_Stories", sql.Int, Success_Stories)
      .input("Stories_Published_Nationally", sql.Int, Stories_Published_Nationally)
      .input("Stories_Published_on_State_Front_Page", sql.Int, Stories_Published_on_State_Front_Page)
      .input("Facebook_Posts", sql.Int, Facebook_Posts)
      .input("Twitter_X_Posts", sql.Int, Twitter_X_Posts)
      .input("ATR___Articles_Shared", sql.Int, ATR___Articles_Shared)
      .input("ATR___Action_Taken", sql.Int, ATR___Action_Taken)
      .input("Instagram_Posts", sql.Int, Instagram_Posts)
      .input("Edit_Response_Link", sql.NVarChar(500), Edit_Response_Link)
      .input("District_id", sql.Int, District_id)
      .input("user_id", sql.NVarChar(50), user_id)
      .execute("sp_InsertDistrictDailyEntry");

    res.status(200).json({
      success: true,
      message: "Entry inserted successfully",
    });

  } catch (error) {
    console.error("Insert Error:", error);

    res.status(500).json({
      success: false,
      message: "Database error",
      error: error.message,
    });
  }
};

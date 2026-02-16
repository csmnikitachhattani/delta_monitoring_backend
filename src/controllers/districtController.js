const { sql, poolPromise } = require("../config/db");

exports.insertDistrictDailyEntry = async (req, res) => {
  try {
    const {
      Email_Address,
      District_name,
      entryDate,
      pressRelease,
      successStories,
      nationalStories,
      stateFundPost,
      facebookPosts,
      twitterPosts,
      instagramPosts,
      Edit_Response_Link = null,
      District_id,
      user_id,
    } = req.body;
    console.log(req.body)
    // Basic validation
    if ( !District_name || !user_id) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const pool = await poolPromise;

    await pool.request()
    .input("Email_Address", sql.NVarChar(255), Email_Address)     
     .input("District_name", sql.NVarChar(150), District_name)
      .input("Date", sql.Date, entryDate)
      .input("Press_Releases", sql.Int, pressRelease)
      .input("Success_Stories", sql.Int, successStories)
      .input("Stories_Published_Nationally", sql.Int, nationalStories)
      .input("Stories_Published_on_State_Front_Page", sql.Int, stateFundPost)
      .input("Facebook_Posts", sql.Int, facebookPosts)
      .input("Twitter_X_Posts", sql.Int, twitterPosts)
      .input("Instagram_Posts", sql.Int, instagramPosts)
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

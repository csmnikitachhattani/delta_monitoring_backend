const { sql, poolPromise } = require("../config/db");

exports.insertDistrictDailyEntry = async (req, res) => {
  try {
    const {
      emailAddress,
      deptId,
      departmentName,
      entryDate,
      pressReleases,
      successStories,
      storiesPublishedNationally,
      storiesPublishedStateFrontPage,
      facebookPosts,
      twitterXPosts,
      atrArticlesShared,
      atrActionTaken,
      instagramPosts,
      editResponseLink,
      user_id
    } = req.body;

    // 🔒 Basic validation
    // if (!entryDate || !deptId || !departmentName) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Dept Id, Department Name and Entry Date are required",
    //   });
    // }
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id are required",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      // Dates
      .input("Form_Timestamp", sql.DateTime, new Date())
      .input("Created_Date", sql.DateTime, new Date())
      .input("Last_Modified_Date", sql.DateTime, null)
      .input("District_Name", sql.NVarChar(255), districtName)
      .input("Entry_Date", sql.Date, entryDate)

      // Counts
      .input("Press_Releases", sql.Int, pressReleases || 0)
      .input("Success_Stories", sql.Int, successStories || 0)
      .input(
        "Stories_Published_Nationally",
        sql.Int,
        storiesPublishedNationally || 0
      )
      .input(
        "Stories_Published_State_Front_Page",
        sql.Int,
        storiesPublishedStateFrontPage || 0
      )
      .input("Facebook_Posts", sql.Int, facebookPosts || 0)
      .input("Twitter_X_Posts", sql.Int, twitterXPosts || 0)
      .input("ATR_Articles_Shared", sql.Int, atrArticlesShared || 0)
      .input("ATR_Action_Taken", sql.Int, atrActionTaken || 0)
      .input("Instagram_Posts", sql.Int, instagramPosts || 0)
      .input("user_id", sql.NVarChar(255), user_id)

      // Meta
      .input(
        "Email_Address",
        sql.NVarChar(255),
        emailAddress || null
      )
      .input(
        "Edit_Response_Link",
        sql.NVarChar(sql.MAX),
        editResponseLink || null
      )

      // Stored procedure call
      .execute("dbo.usp_Insert_Department_Daily_Entry");

    return res.status(201).json({
      success: true,
      message: "Department daily entry inserted successfully",
      entryId: result.recordset[0]?.Entry_Id,
    });
  } catch (error) {
    console.error("InsertDepartmentDailyEntry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to insert department daily entry",
      error: error.message,
    });
  }
};


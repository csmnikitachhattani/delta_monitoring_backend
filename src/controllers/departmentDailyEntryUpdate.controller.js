const { sql, poolPromise } = require("../config/db");

exports.updateDepartmentDailyEntry = async (req, res) => {
  try {
    const { entryId } = req.params;

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
    } = req.body;

    // ✅ Basic validation
    if (!entryId) {
      return res.status(400).json({
        success: false,
        message: "Entry_Id is required",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("Entry_Id", sql.Int, entryId)

      // Department info
      .input("Dept_Id", sql.NVarChar(50), deptId)
      .input("Department_Name", sql.NVarChar(255), departmentName)
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

      // Meta
      .input("Email_Address", sql.NVarChar(255), emailAddress || null)
      .input(
        "Edit_Response_Link",
        sql.NVarChar(sql.MAX),
        editResponseLink || null
      )

      // Execute SP
      .execute("dbo.usp_Update_Department_Daily_Entry");

    return res.status(200).json({
      success: true,
      message: "Department daily entry updated successfully",
      data: result.recordset[0],
    });

  } catch (error) {
    console.error("UpdateDepartmentDailyEntry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update department daily entry",
      error: error.message,
    });
  }
};

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
      District_code
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
     //.input("District_name", sql.NVarChar(150), District_name)
      .input("Date", sql.Date, entryDate)
      .input("Press_Releases", sql.Int, pressRelease)
      .input("Success_Stories", sql.Int, successStories)
      .input("Stories_Published_Nationally", sql.Int, nationalStories)
      .input("Stories_Published_on_State_Front_Page", sql.Int, stateFundPost)
      .input("Facebook_Posts", sql.Int, facebookPosts)
      .input("Twitter_X_Posts", sql.Int, twitterPosts)
      .input("Instagram_Posts", sql.Int, instagramPosts)
      .input("Edit_Response_Link", sql.NVarChar(500), Edit_Response_Link)
      .input("District_id", sql.Int, District_code)
      .input("user_id", sql.NVarChar(50), user_id)
      .input("District_name", sql.NVarChar(50), District_name)
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

exports.getDistrictEntryById = async (req, res) => {
    const { entry_id } = req.params;
  
    if (!entry_id) {
      return res.status(400).json({ error: "entry_id is required" });
    }
  
    try {
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .input("Entry_Id", sql.Int, entry_id)
        .execute("dbo.GetDistrictEntryById");
  
      res.status(200).json({
        success: true,
        data: result.recordset[0] || null,
      });
    } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateDistrictEntry = async (req, res) => {
  const { entry_id } = req.params;
  const data = req.body;

  // ✅ Validate entry_id
  const entryId = parseInt(entry_id, 10);
  if (!entryId) {
    return res.status(400).json({
      success: false,
      message: "Valid entry_id is required",
    });
  }
  console.log(data)
  try {
    const pool = await poolPromise;
    const request = pool.request();

    // ✅ Required param
    request.input("Entry_Id", sql.Int, entryId);

    // ✅ Optional params (match SP params)
    request.input("Email_Address", sql.NVarChar(255), data.Email_Address ?? null);
    request.input("District_name", sql.NVarChar(255), data.District_name ?? null);
    request.input("Date", sql.Date, data.Date ?? null);
    request.input("Press_Releases", sql.Int, data.pressRelease ?? null);
    request.input("Success_Stories", sql.Int, data.successStories ?? null);
    request.input("Stories_Published_Nationally", sql.Int, data.nationalStories ?? null);
    request.input("Stories_Published_on_State_Front_Page", sql.Int, data.stateFrontPost ?? null);
    request.input("Facebook_Posts", sql.Int, data.facebookPosts ?? null);
    request.input("Twitter_X_Posts", sql.Int, data.twitterPosts  ?? null);
    request.input("ATR___Articles_Shared", sql.Int, data.ATR___Articles_Shared ?? null);
    request.input("ATR___Action_Taken", sql.Int, data.ATR___Action_Taken ?? null);
    request.input("Instagram_Posts", sql.Int, data.instagramPosts ?? null);

    request.input("Edit_Response_Link", sql.NVarChar(sql.MAX), data.Edit_Response_Link ?? null);
    request.input("District_id", sql.Int, data.District_code ?? null);
    request.input("User_id", sql.Int, data.User_id ?? null);

    // ✅ Execute SP
    const result = await request.execute("dbo.UpdateDistrictEntry");

    res.status(200).json({
      success: true,
      message: "Entry updated successfully",
      data: result.recordset[0],
    });

  } catch (error) {
    console.error("UpdateDistrictEntry Error:", error);

    // ✅ Handle THROW from SQL
    if (error.number === 50001) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteDistrictEntry = async (req, res) => {
  try {
    const { entry_id } = req.params;

    //const pool = await sql.connect(dbConfig);
    const pool = await poolPromise;
    //const request = pool.request();

    await pool
      .request()
      .input("entry_id", sql.Int, entry_id)
      .execute("usp_SoftDelete_District_Daily_Entry");

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error deleting entry",
      error: error.message
    });
  }
};


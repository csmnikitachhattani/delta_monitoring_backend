const { sql, poolPromise } = require("../config/db");

exports.getDepartmentDailyEntry = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool
      .request() // ❗ no .input() calls
      .execute("dbo.usp_Get_Department_Daily_Entry");

    return res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });
  } catch (error) {
    console.error("GetDepartmentDailyEntry Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch department daily entry data",
      error: error.message,
    });
  }
};

exports.getDailyEntries = async (req, res) => {
  const { user_id, type_id } = req.query;
  // ✅ Validation
  if (!user_id || !type_id) {
    return res.status(400).json({
      error: "user_id and type_id are required",
    });
  }

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("User_Id", sql.Int, parseInt(user_id))
      .input("Type_Id", sql.Int, parseInt(type_id))
      .execute("usp_Get_Daily_Entry_By_User_And_Type");

    //res.status(200).json({data:result.recordset});
    return res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });

  } catch (err) {
    console.error("Daily Entry Error:", err);
    res.status(500).json({ error: err.message });
  }
};



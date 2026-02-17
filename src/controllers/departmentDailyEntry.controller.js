const { sql, poolPromise } = require("../config/db");

exports.getDepartmentDailyEntryById = async (req, res) => {
  try {
    const { entryId } = req.params;
    console.log(entryId)

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
      .execute("dbo.GetDepartmentDailyEntryById");

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result.recordset[0],
    });

  } catch (error) {
    console.error("GET Entry Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

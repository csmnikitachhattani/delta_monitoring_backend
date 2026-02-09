const { sql, poolPromise } = require("../config/db");

exports.getBaseDepartmentByProCode = async (req, res) => {
  try {
    const { proCode } = req.params; // OR req.query.proCode

    if (!proCode) {
      return res.status(400).json({
        success: false,
        message: "PRO_Code is required",
      });
    }

    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("PRO_Code", sql.VarChar(10), proCode)
      .execute("dbo.GetBaseDepartmentByProCode");

    return res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });

  } catch (error) {
    console.error("Error fetching departments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

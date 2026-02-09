// const { sql, poolPromise } = require("../config/db");

// exports.getDepartmentDailyEntry = async (req, res) => {
//   try {
//     const { deptId, entryDate } = req.query;

//     const pool = await poolPromise;

//     const request = pool.request();

//     // Optional filters
//     request.input("Dept_Id", sql.NVarChar(50), deptId || null);
//     request.input("Entry_Date", sql.Date, entryDate || null);

//     const result = await request.execute(
//       "dbo.usp_Get_Department_Daily_Entry"
//     );

//     return res.status(200).json({
//       success: true,
//       count: result.recordset.length,
//       data: result.recordset,
//     });
//   } catch (error) {
//     console.error("GetDepartmentDailyEntry Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch department daily entry data",
//       error: error.message,
//     });
//   }
// };

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


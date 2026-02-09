const sql = require("mssql");

const config = {
  user: 'Admin',
  password: 'Admin@2026',
  server: '103.79.34.50', // 👈 THIS WAS UNDEFINED
  database: 'Delta_Monitoring',
  options: {
    port: 1433,
    encrypt: false,
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ SQL Server connected");
    return pool;
  })
  .catch(err => {
    console.error("❌ SQL connection error:", err);
  });

module.exports = {
  sql,
  poolPromise,
};

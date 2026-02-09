const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const departmentController = require("../controllers/dailyEntry");
const controller = require("../controllers/districtEntryController");

const {
  getDepartmentDailyEntry,
} = require("../controllers/entryListController");

router.post("/userLogin", authController.userLogin);

router.get("/department-daily-entry", getDepartmentDailyEntry);

router.get(
    "/departments/:proCode",
    departmentController.getBaseDepartmentByProCode
  );

  router.post(
    "/district-daily-entry",
    controller.insertDistrictDailyEntry
  );
  

module.exports = router;

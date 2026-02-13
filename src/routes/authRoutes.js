const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const departmentController = require("../controllers/dailyEntry");
const controller = require("../controllers/districtEntryController");
const GetDetail = require("../controllers/departmentDailyEntry.controller");
const UpdateDetail = require("../controllers/departmentDailyEntryUpdate.controller");

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

router.get("/daily-entry/:entryId", GetDetail.getDepartmentDailyEntryById);

router.put(
  "/district-daily-entry/:entryId",
  UpdateDetail.updateDepartmentDailyEntry
);
  

module.exports = router;

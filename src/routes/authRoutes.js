const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const departmentController = require("../controllers/dailyEntry");
const controller = require("../controllers/districtEntryController");
const GetDetail = require("../controllers/departmentDailyEntry.controller");
const UpdateDetail = require("../controllers/departmentDailyEntryUpdate.controller");
const {
  getDepartmentDailyEntry,
  getDailyEntries,
} = require("../controllers/entryListController");
const {insertDistrictDailyEntry, getDistrictEntryById} = require('../controllers/districtController')

router.post("/userLogin", authController.userLogin);

router.get("/department-daily-entry", getDepartmentDailyEntry);
router.get("/get-entries", getDailyEntries);
router.post("/district-entry", insertDistrictDailyEntry);
router.get("/district-entry/:entry_id", getDistrictEntryById);


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

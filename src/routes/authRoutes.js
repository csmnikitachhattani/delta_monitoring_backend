const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const departmentController = require("../controllers/getDepartment");
const controller = require("../controllers/departmentEntryController");
const GetDetail = require("../controllers/departmentDailyEntry.controller");
const UpdateDetail = require("../controllers/departmentDailyEntryUpdate.controller");
const {
  getDepartmentDailyEntry,
  getDailyEntries,
} = require("../controllers/entryListController");
const {insertDistrictDailyEntry, getDistrictEntryById, updateDistrictEntry, deleteDistrictEntry} = require('../controllers/districtController')

router.post("/userLogin", authController.userLogin);

router.get("/department-daily-entry", getDepartmentDailyEntry);

// get daily on condition basis department or District
router.get("/get-entries", getDailyEntries);
router.post("/district-entry", insertDistrictDailyEntry);
router.get("/district-entry/:entry_id", getDistrictEntryById);
router.put("/district-entry-update/:entry_id", updateDistrictEntry);
router.delete("/district-delete-entry/:entry_id", deleteDistrictEntry);


router.get(
    "/departments/:proCode",
    departmentController.getBaseDepartmentByProCode
  );

router.post(
    "/department-daily-entry",
    controller.insertDepartmentDailyEntry
  );

router.delete("/department-entry/:entryId", controller.softDeleteEntry);

router.get("/daily-entry/:entryId", GetDetail.getDepartmentDailyEntryById);

router.put(
  "/department-daily-entry/:entryId",
  UpdateDetail.updateDepartmentDailyEntry
);

  

module.exports = router;

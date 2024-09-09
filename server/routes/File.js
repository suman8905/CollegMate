const express = require("express");
const router = express.Router();
const { localFileUpload, getSubjectName, getFilesByDepartmentAndSubject, fileUploadUsingDriveLink, getUserNotes, DeleteNote } = require("../controllers/File");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix+"-"+ file.originalname );
    },
});

const upload = multer({
    storage: storage,
});

// Routes
router.post("/localFileUpload", auth, upload.single("file"), localFileUpload);
router.post("/fileUploadUsingDriveLink",auth,fileUploadUsingDriveLink);
router.get("/getSubjectName", getSubjectName);
router.get("/getFilesByDepartmentAndSubject", getFilesByDepartmentAndSubject);
router.get("/getUserNotes",getUserNotes);
router.delete("/DeleteNote",DeleteNote);

module.exports = router;

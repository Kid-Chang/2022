const express = require("express");
const router = express.Router();
const multer = require("multer");

// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");

// storage multer CONFIG
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    // mime type 체크하여 원하는 타입만 필터링
    // filtering file by checking MIME TYPE
    // https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    if (file.mimetype == "video/mp4") {
        cb(null, true);
    } else {
        cb({ msg: "mp4 파일만 업로드 가능합니다." }, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    "file",
);
//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
    const reque = req;
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

module.exports = router;

const express = require("express");
const Ffmpeg = require("fluent-ffmpeg");
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

const { Video } = require("../models/Video");

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

router.post("/thumbnail", (req, res) => {
    // make thumbnail and post video runtime

    // init
    let filePath = "";
    let fileDuration = "";

    // get video info
    Ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        // console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    });

    // make thumbnail

    Ffmpeg(req.body.filePath)
        .on("filenames", function (filenames) {
            console.log("Will generate " + filenames.join(", "));
            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on("end", function () {
            console.log("Screenshots taken");
            return res.json({
                success: true,
                filePath: filePath,
                fileDuration: fileDuration,
            });
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: "uploads/thumbnails",
            size: "320x240",
            // %b input basename ( filename w/o extension )
            filename: "thumbnail-%b.png",
        });
});

router.post("/uploadVideo", (req, res) => {
    // Save video infomation.
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

router.get("/getVideos", (req, res) => {
    Video.find()
        .populate("writer")
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos });
        });
});

module.exports = router;

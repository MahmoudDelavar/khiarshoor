const { validationResult } = require("express-validator");
const controller = require("../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { dev_phase } = require("../../../next.config");
const multer = require("multer");
const debug = require("debug")("app:main");
const ffmpeg = require("fluent-ffmpeg");

//====================================
//-----------------------------multer config-----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/videos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname + "loaded");
    if (ext !== ".mp4") {
      return cb(res.status(400).send("only .mp4 allowed "), false);
    }
    cb(null, true);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "50mb" },
}).single("file");
//-----------------------------------------------------

module.exports = new (class extends controller {
  //---------------------load video---------------------
  async uploadVideo(req, res) {
    upload(req, res, (err) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          data: null,
          isSuccess: false,
          message: `cant loade the video: ${err}`,
        });
      }
      this.response({
        res,
        code: 201,
        message: "uploaded Video",
        isSuccess: true,
        data: {
          filePath: res.req.file.path,
          fileName: res.req.file.filename,
        },
      });
    });
  }

  //-----------------generate thumbnail-----------------
  async thumbnail(req, res) {
    let thumbnailFilePath = "";
    let fileDuration = "";
    console.log("req.body.filePath in thumbnal=>", req.body.filePath);
    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
      if (err) {
        return res.json({ message: err });
      }
      fileDuration = metadata.format.duration;
    });
    ffmpeg(req.body.filePath)
      .on("filenames", function (filenames) {
        // console.log("Will generate " + filenames.join(", "));
        thumbnailFilePath = "/uploads/thumbnails/" + filenames[0];
      })
      .on("end", () => {
        this.response({
          res,
          code: 202,
          data: {
            thumbnailFilePath: thumbnailFilePath,
            fileDuration: fileDuration,
          },
          message: "success",
        });
      })
      .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 1,
        folder: "public/uploads/thumbnails",
        size: "320x240",
        filename: "thumbnail_%b.png",
      });
  }
})();

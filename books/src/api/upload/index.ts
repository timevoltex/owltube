import Router from "@koa/router";
import uploadRouter from "./upload.controller";
import multer from "@koa/multer";

const uploadTarget = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/uploads/");
    },
    filename: function (req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf-8"
      );
      cb(null, file.originalname);
    },
  }),
});

const upload = new Router();

upload.post(
  "/single",
  uploadTarget.fields([{ name: "file" }, { name: "video" }]),
  uploadRouter.uploadSingle
);
upload.get("/", uploadRouter.uploadPage);

export default upload;

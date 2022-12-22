import Router from "@koa/router";
import uploadRouter from "./upload.controller";
import multer from "@koa/multer";

const uploadTarget = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const upload = new Router();

upload.post("/single", uploadTarget.single("file"), uploadRouter.uploadSingle);

export default upload;

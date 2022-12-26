import Koa from "koa";
import multer from "@koa/multer";
import fs from "fs";

async function uploadPage(ctx: Koa.ParameterizedContext) {
  const files = fs.readdirSync(__dirname + "/uploads");

  const fileMap: Record<string, string> = {};

  files.map((file) => {
    const data = fs.readFileSync(__dirname + "/uploads/" + file);
    const image = data.toString("base64");
    fileMap[file] = image;
  });

  ctx.body = await ctx.render("upload-form", { fileMap });
}

async function uploadSingle(ctx: Koa.ParameterizedContext) {
  if (!ctx.request.files) {
    ctx.redirect("/api/upload", "book-list");
    return;
  }

  // console.log(ctx.request.files!);

  const files = ctx.request.files! as { [fieldname: string]: multer.File[] };

  if (files["video"]) {
    const video = files["video"].filter((file: multer.File) => {
      return file.fieldname === "video";
    });
    console.log(video);
  }
  if (files["file"]) {
    const image = (
      ctx.request.files! as { [fieldname: string]: multer.File[] }
    )["file"].filter((file: multer.File) => {
      return file.fieldname === "file";
    });
    const {
      filename,
      buffer,
      destination,
      encoding,
      fieldname,
      mimetype,
      originalname,
      path,
      size,
    } = image[0];
    console.log(image[0]);
  }

  ctx.status = 200;

  ctx.redirect("/api/upload");
}

export default { uploadSingle, uploadPage };

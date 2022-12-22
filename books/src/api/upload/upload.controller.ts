import Koa from "koa";
import Router from "@koa/router";

const router = new Router();

async function uploadSingle(ctx: Koa.ParameterizedContext) {
  console.log(ctx.request.file);
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
  } = ctx.request.file;

  ctx.body = originalname;
}

export default { uploadSingle };

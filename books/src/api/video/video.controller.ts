import Koa from "koa";
import fs from "fs";
import path from "path";
import mime from "mime";

async function getVideoList(ctx: Koa.ParameterizedContext) {
  const files: string[] = fs.readdirSync(
    path.dirname(__dirname) + "/upload/uploads"
  );

  const videoNameBuffer: Record<string, Buffer> = {};

  files.forEach((e) => {
    if (mime.getType(e)?.includes("video")) {
      videoNameBuffer[e] = fs.readFileSync(
        path.dirname(__dirname) + "/upload/uploads/" + e
      );
    }
  });

  ctx.body = await ctx.render("video-list", {
    files: Object.keys(videoNameBuffer),
  });
}

export default { getVideoList };

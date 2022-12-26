import Router from "@koa/router";
import upload from "./upload";
import video from "./video";
import blog from "./blog";

const api = new Router();

api.get("/", (ctx) => {
  ctx.redirect("/api/books");
});

api.use("/upload", upload.routes());
api.use("/video", video.routes());
api.use("/blog", blog.routes());

export default api;

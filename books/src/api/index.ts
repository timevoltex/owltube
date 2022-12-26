import Router from "@koa/router";
import upload from "./upload";
import video from "./video";
import blog from "./blog";
import auth from "./auth";

const api = new Router();

api.get("/", (ctx) => {
  ctx.redirect("/api/books");
});

api.use("/upload", upload.routes());
api.use("/video", video.routes());
api.use("/blog", blog.routes());
api.use("/auth", auth.routes());

export default api;

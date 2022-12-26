import Router from "@koa/router";
import books from "api/books";
import upload from "./upload";
import video from "./video";

const api = new Router();

api.get("/", (ctx) => {
  ctx.redirect("/api/books");
});

api.use("/books", books.routes());
api.use("/upload", upload.routes());
api.use("/video", video.routes());

export default api;

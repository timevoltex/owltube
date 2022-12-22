import Router from "@koa/router";
import books from "api/books";
import upload from "./upload";

const api = new Router();

api.get("/", (ctx) => {
  ctx.redirect("/api/books");
});

api.use("/books", books.routes());
api.use("/upload", upload.routes());

export default api;

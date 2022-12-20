import Router from "@koa/router";
import books from "api/books";

const api = new Router();

api.get("/", (ctx) => {
  ctx.redirect("/api/books");
});

api.use("/books", books.routes());

export default api;

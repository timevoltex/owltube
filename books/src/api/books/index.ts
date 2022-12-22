import Router from "@koa/router";
import booksCtrl from "./books.controller";

const books = new Router();

books.get("/", booksCtrl.list);
books.get("/:id", booksCtrl.getOne);
books.post("/", booksCtrl.create);
books.put("/:id", booksCtrl.update);
books.delete("/:id", booksCtrl.remove);
books.patch("/:id", booksCtrl.patch);

export default books;

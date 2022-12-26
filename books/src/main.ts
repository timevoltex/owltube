require("dotenv").config();

import Koa from "koa";
import Router from "@koa/router";
import api from "api";
import bodyParser from "koa-bodyparser";
import views from "koa-views";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();
const render = views(__dirname + "/views", {
  autoRender: false,
  extension: "pug",
});

const port = process.env.PORT || 4000;

router.get("/", (ctx) => {
  ctx.redirect("/api");
});

router.use("/api", api.routes());

app
  .use(
    bodyParser({
      enableTypes: ["form", "json"],
    })
  )
  .use(render)
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log("Successfully connect to port 4000");
});

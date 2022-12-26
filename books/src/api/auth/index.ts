import Router from "@koa/router";
import authCtrl from "./auth.ctrl";

const auth = new Router();

auth.post("/register", authCtrl.register);
auth.post("/login");
auth.get("/check");
auth.post("/logout");

export default auth;

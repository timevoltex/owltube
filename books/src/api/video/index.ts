import Router from "@koa/router";
import videoCtrl from "./video.controller";

const router = new Router();

router.get("/", videoCtrl.getVideoList);

export default router;

import Router from "@koa/router";
import postCtrl from "./post.ctrl";

const router = new Router();

router.get("/", postCtrl.list);
router.post("/", postCtrl.write);
router.get("/:id", postCtrl.read);
router.delete("/:id", postCtrl.remove);
router.patch("/:id", postCtrl.update);

export default router;

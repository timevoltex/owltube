import Router from "@koa/router";
import postCtrl from "./post.ctrl";
import checkedLoggedIn from "lib/check_logged_in";

const posts = new Router();
posts.get("/", postCtrl.list);
posts.post("/", checkedLoggedIn, postCtrl.write);

const router = new Router();

router.get("/", postCtrl.read);
router.delete("/", checkedLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
router.patch("/", checkedLoggedIn, postCtrl.checkOwnPost, postCtrl.update);

posts.use("/:id", postCtrl.getPostById, router.routes());

export default posts;

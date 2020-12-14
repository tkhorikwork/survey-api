import * as Router from "koa-router";
import userRouters from "./user";
import surveyRouters from "./survey";

const router = new Router({ prefix: "/api" });

router.use(userRouters().middleware());
router.use(surveyRouters().middleware());

export default router;

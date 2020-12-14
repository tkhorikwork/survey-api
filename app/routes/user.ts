import * as Router from "koa-joi-router";

import { addNewUser } from "../controllers/user.controller";

const user = Router();
user.prefix("/users");

user.route({
  method: "post",
  path: "/",
  meta: {},
  validate: {
    // TODO
  },
  handler: addNewUser,
});

export default () => user;

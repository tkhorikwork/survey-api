import { ParameterizedContext } from "koa";
import { createUser } from "../services";

export const addNewUser = async (ctx: ParameterizedContext) => {
  const { body } = ctx.request;

  const user = await createUser(body);
  ctx.ok(user);
};

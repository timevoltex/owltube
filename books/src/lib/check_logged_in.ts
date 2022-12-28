import { ParameterizedContext, Next } from "koa";

export default function checkedLoggedIn(ctx: ParameterizedContext, next: Next) {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
}

import User from "models/user";
import { ParameterizedContext } from "koa";
import { z } from "zod";

async function register(ctx: ParameterizedContext) {
  const schema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
  });

  const result = schema.safeParse(ctx.request.body);
  if (!result.success) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = result.data;
  try {
    const exists = await User.findOne({
      where: { username: username },
    });
    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new User({ username, password });
    const data = user.toJSON();
    ctx.body = data;
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

export default { register };

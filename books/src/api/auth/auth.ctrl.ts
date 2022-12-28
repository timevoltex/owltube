import model from "models";
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
  console.log(result.data);
  try {
    const exists = await model.User.findOne({
      where: { username: username },
    });
    console.log(exists);
    if (exists) {
      ctx.status = 409;
      return;
    }

    const user = new model.User({ username, password });
    const data = user.toJSON();
    await user.save();

    delete data.password;

    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    ctx.body = data;
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function login(ctx: ParameterizedContext) {
  const { username, password } = <{ username?: string; password?: string }>(
    ctx.request.body
  );

  if (!username || !password) {
    ctx.status = 401;
    return;
  }
  try {
    const user = await model.User.findOne({
      where: { username: username },
    });
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = user.validatePassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }

    const data = user.toJSON();
    delete data.password;

    ctx.body = data;

    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function check(ctx: ParameterizedContext) {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = user;
}

async function logout(ctx: ParameterizedContext) {
  ctx.cookies.set("access_token");
  ctx.status = 204;
}

export default { register, login, check, logout };

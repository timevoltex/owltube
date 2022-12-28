import jwt from "jsonwebtoken";
import { ParameterizedContext, Next } from "koa";

const jwtMiddleWare = (ctx: ParameterizedContext, next: Next) => {
  const token = ctx.cookies.get("access_token");

  if (!token) return next();
  try {
    const decoded = <jwt.JwtPayload>jwt.verify(token, process.env.JWT_SECRET!);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    return next();
  } catch (e) {
    console.log(e);
    return next();
  }
};

export default jwtMiddleWare;

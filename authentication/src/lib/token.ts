import jwt, { JwtPayload } from "jsonwebtoken";
import Koa from "koa";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (payload: any) => {
  console.log(payload);
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, jwtSecret!, { expiresIn: "7d" }, (err, token) => {
      if (err) reject(err);
      if (!token) {
        reject(new Error("token is undefined"));
        return;
      }
      resolve(token);
    });
  });
};

const decodeToken = (token: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, jwtSecret!, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      if (decoded == undefined) {
        reject(new Error("decoded is undefined"));
        return;
      }

      resolve(decoded);
    });
  });
};

export const jwtMidlleware = async (
  ctx: Koa.ParameterizedContext,
  next: Koa.Next
) => {
  const token = ctx.cookies.get("access_token");
  if (!token) return next();

  try {
    const decoded: JwtPayload = await decodeToken(token);

    if (Date.now() / 1000 - decoded.iat! > 60 * 60 * 24) {
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile });
      ctx.cookies.set("accessToken", freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    (ctx.request as any).user = decoded;
  } catch (e) {
    (ctx.request as any).user = null;
  }
  return next();
};

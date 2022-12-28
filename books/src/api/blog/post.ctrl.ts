import model from "models";
import { Next, ParameterizedContext } from "koa";
import { FindOptions } from "sequelize";

interface BlogRequest {
  title: string;
  body: string;
}

async function write(ctx: ParameterizedContext) {
  const { title, body } = <BlogRequest>ctx.request.body!;
  try {
    const post = {
      title: title,
      body: body,
      userName: ctx.state.user.username,
    };
    const pt = await model.Blog.create(post);

    await pt.save();
    ctx.body = "ok";
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function getPostById(ctx: ParameterizedContext, next: Next) {
  const { id }: { id: string } = ctx.params;

  try {
    const post = await model.Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    ctx.body = post;
    return next();
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function checkOwnPost(ctx: ParameterizedContext, next: Next) {
  const { user, post } = ctx.state;
  console.log(ctx.state);
  if (post.username !== user.username) {
    ctx.status = 403;
    return;
  }
  return next();
}

async function read(ctx: ParameterizedContext) {
  ctx.body = ctx.state.post;
}

async function remove(ctx: ParameterizedContext) {
  const { id }: { id: string } = ctx.params;
  try {
    const post = await model.Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    await post.destroy();
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}
async function update(ctx: ParameterizedContext) {
  const { id }: { id: string } = ctx.params;
  const { title, body } = <BlogRequest>ctx.request.body;
  try {
    const post = await model.Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    post.title = title ?? post.title;
    post.body = body ?? post.title;

    ctx.body = post;

    await post.save();
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function list(ctx: ParameterizedContext) {
  const page: number = parseInt(<string>ctx.query.page || "1", 10);
  const { username } = ctx.query;

  let offset = 0;
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  if (page > 1) {
    offset = 10 * (page - 1);
  }

  const query = <FindOptions>{
    ...(username ? { where: { userName: username } } : {}),
    limit: 10,
    offset: offset,
    order: [["id", "DESC"]],
  };

  try {
    const posts = await model.Blog.findAll(query);

    const postCount = posts.length;
    ctx.set("Last-Page", String(Math.ceil(postCount / 10)));

    ctx.body = posts.map((e) => ({
      ...e.dataValues,
      body:
        e === undefined
          ? undefined
          : e.body!.length < 200
          ? e.body
          : `${e.body!.slice(0, 200)}...`,
    }));
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

export default { write, list, getPostById, remove, update, checkOwnPost, read };

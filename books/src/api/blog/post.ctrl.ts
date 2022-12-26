import Blog from "../../models/blog";
import { ParameterizedContext } from "koa";
import { z } from "zod";

interface BlogRequest {
  title: string;
  body: string;
}

async function write(ctx: ParameterizedContext) {
  const { title, body } = <BlogRequest>ctx.request.body!;
  try {
    const post = { title: title, body: body };
    await Blog.create(post);
    ctx.body = "ok";
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function read(ctx: ParameterizedContext) {
  const { id }: { id: string } = ctx.params;

  try {
    const post = await Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function remove(ctx: ParameterizedContext) {
  const { id }: { id: string } = ctx.params;
  try {
    const post = await Blog.findByPk(id);
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
    const post = await Blog.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }
    post.title = title;
    post.body = body;

    ctx.body = post;

    await post.save();
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

async function list(ctx: ParameterizedContext) {
  let page: number;
  if (ctx.query.page !== undefined) {
    if (ctx.query.page === typeof Array) {
      page = parseInt(ctx.query.page[0] || "1", 10);
    } else {
      page = parseInt(<string>ctx.query.page || "1", 10);
    }
  } else {
    page = 1;
  }
  let offset = 0;
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  if (page > 1) {
    offset = 10 * (page - 1);
  }

  try {
    const posts = await Blog.findAll({
      limit: 10,
      offset: offset,
      order: [["id", "DESC"]],
    });

    ctx.body = posts;
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

export default { write, list, read, remove, update };

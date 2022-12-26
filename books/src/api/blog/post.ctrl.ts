import Blog from "../../models/blog";
import { ParameterizedContext } from "koa";

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
  try {
    const posts = await Blog.findAll();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(String(e), 500);
  }
}

export default { write, list, read, remove, update };

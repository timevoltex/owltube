import Koa from "koa";
import { z } from "zod";
import { Types } from "mongoose";
import books from "../../model/book";

async function list(ctx: Koa.ParameterizedContext) {
  let book;

  book = await books.find().exec();

  if (!book) {
    ctx.status = 404;
    ctx.body = {
      message: "book not found",
    };
    return;
  }
  ctx.body = await ctx.render("book_list.pug", { book });
}
async function getOne(ctx: Koa.ParameterizedContext) {
  const { id }: { id: string } = ctx.params;

  let book;
  try {
    book = await books.findById(id);

    if (!book) {
      ctx.status = 404;
      ctx.body = {
        message: "book not found",
      };
      return;
    }
    // ctx.body = book;
  } catch (e: any) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e);
  }
}

async function create(ctx: Koa.ParameterizedContext) {
  if (ctx.request.body !== undefined && ctx.request.body !== null) {
    const book = new books(ctx.request.body);

    try {
      await book.save();
    } catch (e) {
      return ctx.throw(String(e), 500, {});
    }

    ctx.body = book;
  }
}

async function update(ctx: Koa.ParameterizedContext) {
  const { id }: { id: string } = ctx.params;

  if (!Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  const schema = z.object({
    title: z.string(),
    authors: z.array(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    ),

    price: z.number(),
    tags: z.array(z.string()),
  });

  const result = schema.safeParse(ctx.request.body);

  if (!result.success) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  let book;

  try {
    book = await books.findByIdAndUpdate(id, ctx.request.body!, {
      new: true,
      upsert: true,
    });

    if (!book) {
      ctx.status = 404;
      ctx.body = {
        message: "book not found",
      };
      return;
    }
    ctx.body = book;
  } catch (e: any) {
    return ctx.throw(500, e);
  }

  ctx.body = book;
}

function remove(ctx: Koa.ParameterizedContext) {
  const { id }: { id: string } = ctx.params;

  try {
    books.findByIdAndRemove(id).exec();
  } catch (e: any) {
    if (e.name === "CastError") {
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e);
  }
  ctx.status = 204;
}

async function patch(ctx: Koa.ParameterizedContext) {
  const { id } = ctx.params;

  if (!Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }

  let book;

  try {
    book = await books.findByIdAndUpdate(id, ctx.requrest.body, {
      new: true,
    });
  } catch (e) {}

  ctx.body = "patched";
}

export default { list, create, update, remove, patch, getOne };

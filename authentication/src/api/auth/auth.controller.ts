import Koa from 'koa';

export const localRegister = async (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'register';
}

export const localLogin = async (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'login';
}

export const exsist = async (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'exsist';
}

export const logout = async (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'logout';
}
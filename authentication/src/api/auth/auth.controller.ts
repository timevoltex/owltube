import Koa from 'koa';
import { z} from 'zod';
import Account from 'model/account';

export const localRegister = async (ctx: Koa.ParameterizedContext) => {
    const schema = z.object({
        username: 
            z.string().min(4).max(15).nullable().optional(),   
        email: z.string().email().optional(),
        password: z.string().min(6),
    });
    
    try{
        schema.parse(ctx.request.body);
    }catch(e) {
        ctx.status = 400;
        ctx.body = e;
        return;
    }

    let existing = null;
    try{
        existing = await Account.findByEmailOrUsername(ctx.request.body as {username: string, email: string});

    }catch(e) {
        ctx.throw(String(e), 500);
    }

    if(existing) {
        ctx.status = 409;
            ctx.body = {
                key: existing.email === (ctx.request.body! as {email:string}).email ? 'email' : 'username',
            
        }
        return;
    }


    let account = null;
    try{
        account = await Account.localRegister(ctx.request.body as {username: string, email: string, password: string});
    }catch(e) {
        ctx.throw(String(e), 500);
    
    }
    

    ctx.body = account.profile;
}

export const localLogin = async (ctx: Koa.ParameterizedContext) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    try{
        schema.parse(ctx.request.body);
    }catch(e) {
        ctx.status = 400;
        return;
    }

    const {email, password} = ctx.request.body as {email: string, password: string};
    let account = null;

    try{
        account = await Account.findByEmail(email);
        console.log(account);
    }catch(e) {
        ctx.throw(String(e), 500);
    }

    if(!account || !account.validatePassword(password)) {
        ctx.status = 403;
        return;
    }

    ctx.body =  account.profile;
}

export const exsist = async (ctx: Koa.ParameterizedContext) => {
    const {key, value} = ctx.params;

    let account = null;

    try{
        account = await (key == 'email' ? Account.findByEmail(value) : Account.findByUsername(value));
    }catch(e) {
        ctx.throw(String(e), 500);
    }
    ctx.body = {
        exsist: account !== null,
    }

}

export const logout = async (ctx: Koa.ParameterizedContext) => {
    ctx.body = 'logout';
}
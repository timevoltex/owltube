 import crypto from 'crypto';
 import Koa from 'koa';
 import Router from '@koa/router';
import api from 'api';

 const app = new Koa();
 const router = new Router();
 const password = 'abc123';
 const secret = 'MySecretKey1$1$234';

 const hashed = crypto.createHmac('sha256', secret).update(password).digest('hex');

 console.log(hashed);
 router.use('/api', api.routes());

 app.use(router.routes()).use(router.allowedMethods());

 app.listen(4000, () => {});

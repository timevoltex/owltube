import Router from '@koa/router';
import * as authCtrl from 'api/auth/auth.controller';

const auth = new Router();

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.get('/exists/:key(email|username)/:value', authCtrl.exsist);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);

export default auth;

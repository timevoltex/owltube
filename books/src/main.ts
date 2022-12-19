require('dotenv').config();

import Koa from 'koa';
import Router from '@koa/router';
import api from 'api';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';


const app = new Koa();
const router = new Router();

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL!, {
},).then((_) => {
    console.log('Successfully connected to mongodb');
}).catch((e) => console.error(e));

const port = process.env.PORT || 4000;

router.use('/api', api.routes());

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods());


app.listen(port, () => {
    console.log("Successfully connect to port 4000")
});


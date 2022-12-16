import {Schema, model} from "mongoose";
import crypto from 'crypto';

function hash(password: string) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY!).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: String,
        thumbnail: {
            type: String, default: '/static/images/default_thumbnail.png'
        }
    },
    email: {type: String},

    social: {
        facebook: {
            id: String,
            accessToken: String,
        },
        google: {
            id: String,
            accessToken: String,
        }
    },
    password: String,
    thoughCount: {
        type: Number, default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

Account.statics.findBtUsername = function (username: string) {
    return this.findOne({'profile.username': username}).exec();
}

Account.statics.findByEmail = function (email: string) {
    return this.findOne({'profile.email': email}).exec();
}

Account.statics.findByEmailOrUsername = function ({username, email}: { username: string, email: string }) {
    return this.findOne({
        $or: [
            {'profile.username': username},
            {'profile.email': email}
        ]
    }).exec();
}

Account.statics.localRegister = function({username, email, password}: { username: string, email: string, password: string }) {
    const account = new this({
        profile: {
            username,
        },
        email,
        password: hash(password),
    })

    return account.save();
}

Account.methods.validatePassword = function(password: string) {
    const hashed = hash(password);
    return this.password === hashed;
}

export default model('Account', Account);

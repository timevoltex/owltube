import {Schema, model, Model, HydratedDocument} from "mongoose";
import {generateToken} from 'lib/token';
import crypto from 'crypto';

function hash(password: string) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY!).update(password).digest('hex');
}

 interface IAccount{
    profile: {
    
        username: string;
        thumbnail: string;
    }
    email: string;
    password: string,
    social: {
        facebook: {
            id: string;
            accessToken: string;
        }
        google: {
            id: string;
            accessToken: string;
        }
    },
    thoughCount: number;
    createdAt: Date;
    
}

interface IAccountMethods {
    validatePassword(password: string): boolean;
    makeToken(): Promise<string>;
}

interface AccountModel extends Model<IAccount, {}, IAccountMethods> {
localRegister: ({username, email, password}: { username: string, email: string, password: string }) => Promise<HydratedDocument<IAccount, IAccountMethods>>;
findByUsername: (username: string) => Promise<HydratedDocument<IAccount, IAccountMethods> | null>;
findByEmail: (email: string) => Promise<HydratedDocument<IAccount, IAccountMethods> | null>;
findByEmailOrUsername: ({username, email}: { username: string, email: string }) => Promise<HydratedDocument<IAccount, IAccountMethods> | null>;
};


const Account = new Schema<IAccount, AccountModel, IAccountMethods>({
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
    
},);

Account.static('localRegister', function localRegister({username, email, password}: { username: string, email: string, password: string }) {
    const account: any = new this({
        profile: {
            username,
        },
        email,
        password: hash(password),
    })

    return account.save();
});

Account.static('findByEmail', function findByEmail(email: string) {
    return this.findOne({'email': email, }).exec();
});

Account.static('findByUsername', function findByUsername(username: string) {
    return this.findOne({'profile.username': username}).exec();
});

Account.static('findByEmailOrUsername', function findByEmailOrUsername({username, email}: { username: string, email: string }) {
    return this.findOne({
        $or: [
            {'email': email},
            {'profile.username': username},
        ]
    }).exec();
});

Account.method('validatePassword', function validatePassword(password: string) {
    const hashed = hash(password);
    return this.password === hashed;
} );

Account.method('generateToken', function makeToken() {
    const payload = {
        _id: this.id,
        profile: this.profile,
    };

    return generateToken(payload, 'account');
    
})



export default model<IAccount, AccountModel>('Account', Account);

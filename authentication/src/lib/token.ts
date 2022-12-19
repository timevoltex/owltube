import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (...payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret!, {expiresIn: '7d',}, (err, token) => {
            if(err) reject(err);
            resolve(token);
        });
    });
}

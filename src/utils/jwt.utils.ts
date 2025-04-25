import jwt from 'jsonwebtoken';

import env from './env.utils';
import log from './logger';

const privateKey = env.PRIVATE_KEY;
const publicKey = env.PUBLIC_KEY;

export function signJwt(
    object: Object,
    options?: jwt.SignOptions | undefined
) {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256' 
    });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: true,
            decoded
        };
    } catch(error: any) {
        log.error(error.message);
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}
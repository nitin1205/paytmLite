import {  Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { JwtPayload } from "jsonwebtoken";




interface customJwtPayload extends JwtPayload {
 _id: string;
};

declare global {
    namespace Express {
      interface Request {
        userId?: string; // Add your custom property
      }
    }
  }

const deserializeUser = async(req: Request, res: Response, next: NextFunction) => {
    const token = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    if(!token) return next();

    const { decoded, expired } = verifyJwt(token);
    
    if (decoded) {
        if(typeof decoded === 'object' && '_id' in decoded) {
            const req.userId = decoded._id  
        }
    }

    console.log("wegukkbfryeiufgyer", decoded, typeof(decoded));

    return next();
}

export default deserializeUser;
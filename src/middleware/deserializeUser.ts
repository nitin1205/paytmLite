import {  Request, Response, NextFunction } from "express";
import { get } from "lodash";

import { verifyJwt } from "../utils/jwt.utils";
import JwtPayloadSchema from "../schema/jwtPayload.schema";


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
        const validatedDecoded = JwtPayloadSchema.parse(decoded);
        req.userId = validatedDecoded._id; 
        return next();
    }

    if(expired) {
      return res.status(403).json({ message: 'Token expired lognin again' }); 
    }

    

    return next();
}

export default deserializeUser;
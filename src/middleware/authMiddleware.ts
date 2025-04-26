import { Request, Response, NextFunction } from "express";


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
   const userId = req.userId;
   
   if(!userId) res.status(403).json({ message: 'Unauthorized' });

   return next()
}

export default authMiddleware;
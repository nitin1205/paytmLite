import { Express, Request, Response } from "express";

import { createUserHandler, getUsersHandler, updateUserHandler, userSignInHandler } from "./controller/user.controller";
import { validate } from "./middleware/validateRequest";
import { CreateUserSchema, UserSignInSchema, UserUpdateSchema } from "./schema/user.schema";
import authMiddleware from "./middleware/authMiddleware";
import { fundTransferHandler, getAccountBalanceHandler } from "./controller/account.controller";

export default function router(app: Express) {
    app.get('/api/v1/ping', (req: Request, res: Response) => {
        res.status(200).send('ok');
    });

    app.get('/api/v1/checktoken', authMiddleware ,(req, res) => {
        res.send('ok');
    })
    
    app.post('/api/v1/user/signup', validate(CreateUserSchema), createUserHandler);
    
    app.post('/api/v1/user/signin', validate(UserSignInSchema), userSignInHandler);

    app.put('/api/v1/user', [authMiddleware, validate(UserUpdateSchema)], updateUserHandler);

    app.get('/api/v1/user/bulk', authMiddleware, getUsersHandler);

    app.get('/api/v1/account/balance', authMiddleware, getAccountBalanceHandler);

    app.post('/api/v1/account/transfer', authMiddleware, fundTransferHandler);
    

}


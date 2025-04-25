import { Express, Request, Response } from "express";
import { createUserHandler, userSignInHandler } from "./controller/user.controller";
import { validate } from "./middleware/validateRequest";
import { createUserSchema, userSignInSchema } from "./schema/user.schema";

export default function router(app: Express) {
    app.get('/api/v1/ping', (req: Request, res: Response) => {
        res.status(200).send('ok');
    });

    app.post('/api/v1/user/signup', validate(createUserSchema), createUserHandler);
    
    app.post('/api/v1/user/signin', validate(userSignInSchema), userSignInHandler);

    app.get('/api/v1/checktoken', (req, res) => {
        res.send('ok');
    })

}


import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { validate } from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";

export default function router(app: Express) {
    app.get('/api/v1/ping', (req: Request, res: Response) => {
        res.status(200).send('ok');
    });

    app.post('/api/v1/user', validate(createUserSchema), createUserHandler);


}


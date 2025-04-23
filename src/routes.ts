import { Express, Request, Response } from "express";

export default function router(app: Express) {
    app.get('/ping', (req: Request, res: Response) => {
        res.status(200).send('ok');
    });
}


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 

import log from './utils/logger';
import router from './routes';
import connectToDb from './utils/dbConnection';
import env from './utils/env.utils';
import deserializeUser from './middleware/deserializeUser';

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());
app.use(deserializeUser)

router(app);

app.listen(env.PORT, async ()=> {
    log.info(`listening to port ${env.PORT}`);
    await connectToDb();
});
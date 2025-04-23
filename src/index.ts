import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';

import log from './utils/logger';
import router from './routes';
import connectToDb from './utils/dbConnection';

const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

router(app);

app.listen(PORT, async ()=> {
    log.info(`listening to port ${PORT}`);
    await connectToDb();
});
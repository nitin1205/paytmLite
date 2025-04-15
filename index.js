import express from'express';
import 'dotenv/config';
import bodyParser from 'body-parser';

import { router } from './routes/index.js'

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/api/v1', router);


app.listen(process.env.PORT);
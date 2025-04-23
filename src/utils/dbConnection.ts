import mongoose from "mongoose";
import 'dotenv/config';

import log from "./logger";

export default async function connectToDb(){
    const dbURL = process.env.dbURL as string;
    
    let retries = 3; 
    
    while(retries > 0) {
        try {
            await mongoose.connect(dbURL);
            log.info('connected to DB');
            break;
        } catch(error: any) {
            retries--;
            log.error(`Failed to connect to DB`);
            log.error(`ErrMsg:-${error.errmsg}, ErrCode:-${error.code}, ErrCodeName:-${error.codeName}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    if(!retries) process.exit(1) ; 
    
};

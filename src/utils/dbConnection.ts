import mongoose from "mongoose";

import log from "./logger";
import env from "./env.utils";

export default async function connectToDb(){
    const dbURL = env.dbURL;
    
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

import winston from 'winston';
import fs from 'fs';
import { json } from 'express';


const logger = winston.createLogger({
    level : 'info',
    defaultMeta : {service : 'request-logging'},
    format: winston.format.json(),
    transports : [new winston.transports.File({filename: 'combined.log'})]
});

const loggerMiddleware = async(req,res,next) => {
    if(!req.url.includes('signIn')){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData);
    }
    next();
}

export default loggerMiddleware;
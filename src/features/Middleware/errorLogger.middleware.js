import winston  from 'winston';

const logger = winston.createLogger({
    level : 'error',
    format : winston.format.json(),
    defaultMeta : {service : 'error-logging'},
    transports : [new winston.transports.File({filename : 'error.log'})]
});

 const errorLoggerMiddleware = async (req,res,next) => {
    if(req.url.includes("signIn")){
        const errorData = `${new Date.now().toString()}-${req.url}-${JSON.stringify(req.error)} `;
        logger.error(errorData);
    }
    next();
} 

export default errorLoggerMiddleware;
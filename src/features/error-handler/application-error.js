

export default class applicationError extends Error{
    constructor(statusCode,errMessage){
        super(errMessage);
        this.statusCode = statusCode;
    }
}
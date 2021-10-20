class ErrorResponse extends Error {
    constructor(statusCode, message, reason){
        super(message)
        this.statusCode = statusCode;
        this.reason = reason;
    }
}
module.exports = ErrorResponse;
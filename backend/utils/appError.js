class AppError extends Error {
    constructor(message, statusCode) {
        super(messgae);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
'use strict'

const StatusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,

    INTERNAL_SERVER: 500
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error',
    INTERNAL_SERVER: 'Internal Server error'
}

class ErrorResponse extends Error{
    constructor(message, status){
        super(message)
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse{
    constructor( message = ReasonStatusCode.CONFLICT, statusCode=StatusCode.CONFLICT ){
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse{
    constructor( message = ReasonStatusCode.CONFLICT, statusCode=StatusCode.CONFLICT ){
        super(message, statusCode)
    }
}

class InternalServerError extends ErrorResponse{
    constructor( message = ReasonStatusCode.INTERNAL_SERVER, statusCode=StatusCode.INTERNAL_SERVER ){
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    InternalServerError
}
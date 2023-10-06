'use strict'

const StatusCode = {
    OK: 200,
    CREATED: 201
}

const ReasonStatusCode = {
    CREATED: 'Created',
    OK: 'Success'
}

class SuccessRespone {
    constructor({ statusCode = StatusCode.OK, message, reasonStatusCode = ReasonStatusCode.OK, metaData = null }){
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metaData = metaData;
    }

    send(res, headers = {}){
        return res.status ( this.status ).json(this);
    }
}

class OK extends SuccessRespone {
    constructor( {message, metaData} ){
        super({message, metaData})
    }
}

class CREATED extends SuccessRespone {
    constructor({ options = {}, statusCode = StatusCode.CREATED, message, reasonStatusCode = ReasonStatusCode.CREATED, metaData }){
        super( { message, statusCode, reasonStatusCode, metaData } );
        this.options = options;
    }
}

module.exports = {
    OK,
    CREATED
}
'use strict'

const mongoose = require('mongoose');
const { db: { host, port, name } } = require('../configs');
const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
    constructor(){
        this.connect();
    }

    //connect
    connect(type = 'mongodb'){
        //dev
        if(1===1){
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }

        mongoose.connect(connectString)
        .then(_=>console.log(`\x1b[32mSuccessfully connected to Mongodb`))
        .catch(err=>{
            console.log(`\x1b[31mError connecting to Mongodb`);
            console.error(err);
        });
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
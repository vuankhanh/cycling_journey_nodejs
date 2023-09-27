'use strict'

const mongoose = require('mongoose');

const connectString = `mongodb://localhost:27017/cycling_journey`;

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

        mongoose.connect(connectString).then(_=>console.log(`Connected Mongodb Success`))
        .catch(err=>{
            console.log(`Error Connect`);
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
'use strict'

const { createClient }= require('redis');
const client = createClient();

class Database {
    constructor(){
        this.connect();
    }

    //connect
    connect(){
        client.connect()
        .then(_=>console.log(`\x1b[32mSuccessfully connected to Redis`))
        .catch(err=>{
            console.log(`\x1b[31mError connecting to Redis`);
            console.error(err);
        });
    }

    get(key){
        return client.get(key).then(res=>JSON.parse(res));
    }

    set(key, value){
        client.set(key, JSON.stringify(value));
        this.get(key);
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceRedis = Database.getInstance();

module.exports = instanceRedis;
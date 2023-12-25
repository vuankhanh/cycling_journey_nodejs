'use strict'

const { createClient }= require('redis');
const client = createClient();

class Database {
    isReady = false;
    constructor(){
        this.connect();
    }

    //connect
    connect(){
        client.connect()
        .then(_=>console.log(`\x1b[32mSuccessfully connected to Redis`))
        .catch(err=>{
            console.log(`\x1b[31mError connecting to Redis`);
        });

        client.on('ready', ()=>{
            console.log('Redis is ready');
            this.isReady = true;
        });
        client.on('error', ()=>{
            if(this.isReady) this.isReady = false;
        });
    }

    get(key){
        return this.isReady ? client.get(key)
        .then(res=>JSON.parse(res))
        .catch(err=>{
            console.log(err);
        }) : null;
    }

    set(key, value){
        if(this.isReady){
            client.set(key, JSON.stringify(value));
        }
    }

    log(type) {
        return function() {
            console.log(type);
            console.log('arguments: ');
            console.log(arguments);
        }
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
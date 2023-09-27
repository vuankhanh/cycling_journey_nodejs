'use strict'

const mongoose = require('mongoose');

const connectString = `mongodb://localhost:38017/cycling_journey`;

mongoose.connect(connectString).then(_=>console.log(`Connected Mongodb Success`))
.catch(err=>console.log(`Error Connect`));

//dev
if(1===1){
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });
}

module.exports = mongoose;
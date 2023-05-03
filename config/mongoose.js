const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/codeial-development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Error while connecting to DB'));

db.once('open',function(){
    console.log("MongoDB is connected");
})


module.exports=db;
const express = require('express');
const port = 8000;
const app = express();

//use the router
app.use('/',require('./routes/index'));



app.listen(port,function(err){
    if(err){
        console.log(`Error connecting to server : ${err}`);
        return ;
    }
    console.log(`server is up and running on port : ${port}`);
})
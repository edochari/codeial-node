const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
//use express layouts
app.use(expressLayouts);

//extracting styles or scripts from sub pages to main page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use the router
app.use('/',require('./routes/index'));

//setting the view engine and path
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error connecting to server : ${err}`);
        return ;
    }
    console.log(`server is up and running on port : ${port}`);
})
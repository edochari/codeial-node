const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser = require('cookie-parser');
// use of passport and cookies
const passport = require('passport');
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require('./config/passport-jwt-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const flashMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//use express layouts
app.use(expressLayouts);

//extracting styles or scripts from sub pages to main page
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



//setting the view engine and path
app.set('view engine','ejs');
app.set('views','./views');

//creating session 
//mongo store is used to store the session cookie in db
app.use(session({
    name:'codeial',
    secret:'something', // to be changed while deployment
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 *100)
    },
    store:MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial-development',
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || "mongo store connection is ok");
        }
    )

}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//using flash messages
app.use(flash());
app.use(flashMware.setFlash);

//use the router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error connecting to server : ${err}`);
        return ;
    }
    console.log(`server is up and running on port : ${port}`);
})
const express = require('express');
const app = express();
const route = require('./route');
const flash = require('connect-flash');
const session = require('express-session');

// Body paerser
app.use(express.urlencoded({extended: true}));

// Express Session
app.use(session({
    secret:'adevon-development-operations',
    resave: true,
    saveUninitialized:true,
}))
// Connect flash
app.use(flash());

//Global variables 
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//app settings 
app.set('port', process.env.port || 4000);
app.set('view engine','ejs');

// Using Routes
route(app);


// static Meadleware
app.use('/public', express.static(__dirname + '/public'));

// Meadelware and Error functions
app.use((req, res)=>{
    res.type('text/plain');
    res.status(400);
    res.send(' 404 Sorry the page could not FOUND...');
});
app.use((err,req, res, next)=>{
    console.error(err.stack); 
    res.type('text/plain');
    res.status(500);
    res.send('Sorry page not found... Server Error');
});

 // Express Running on PORT 4000
app.listen(app.get('port'), ()=>{
    console.log('Express Running on http://localhost:'+app.get('port')+' Type Ctrl to Exit...');
});

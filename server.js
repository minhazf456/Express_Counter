// Load express Module
var express = require("express");
// Invoke express and store the result in the variable app
var app = express();

// load express-session module
var session = require("express-session")

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
// Set static folder for html and css files.
app.use(express.static(__dirname + "/static"));



// Set location for ejs views
app.set('views', __dirname + '/views');
// Set ejs views engine
app.set('view engine', 'ejs');


// root route to render the index.ejs view

app.get('/', function (request, response) {
    console.log("The request object", request);
    //starting the count
    if (!request.session.counter) {
        request.session.counter = 1;
    } else {
        request.session.counter = request.session.counter + 1; ///// aanother way to write  request.session.counter +=1
    }
    response.render('index', {
        'counter': request.session.counter
    });
    console.log("The response object", response)
});


app.post('/counter2', function (request, response) {

    console.log("The request object", request);
    if (!request.session.counter) {
        request.session.counter = 2;
    } else {
        request.session.counter = request.session.counter + 2;
    }
    response.render('index', {
        'counter': request.session.counter
    });
    console.log("The response object", response);
});

// reset the counter
app.post('/reset', function (request, response) {
    request.session.counter = 1;
    response.render('index', {
        'counter': request.session.counter
    });
});

// tell the express app to listen on port 8000, always put this at the end of your server.js file

app.listen(8000, () => console.log("listening on port 8000"));
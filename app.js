var express = require('express');

var app = express();

app.use(express.static('public/template/')); //html file script tags search in this directory for dependencies

app.use(express.static('./src/views/'));

app.use(express.static("bower_components"));

app.get('/', function(req, response) {
    
    // response.send("Hello");
    response.render('index', {});
});


app.listen('8080', function(err) {
  
    if (err) {
        console.log('error listening @ 8080')
    }
    else {
        console.log('server listening @ 8080')
    }
});
    
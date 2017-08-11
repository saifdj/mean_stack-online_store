var express = require('express');

var app = express();

app.use(express.static('public/templates/')); //html file script tags search in this directory for dependencies

app.get('/', function(req, response) {
    
    response.send("Hello");
});


app.listen('8080', function(err) {
  
    if (err) {
        console.log('error listening @ 8080')
    }
    else {
        console.log('server listening @ 8080')
    }
});
    
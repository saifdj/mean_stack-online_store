var express = require('express');

var app = express();

var productsRoute = require("./src/routes/productRoutes.js");


app.use(express.static('public/template/')); //html file script tags search in this directory for dependencies


app.use(express.static("bower_components"));


app.set("view engine" , "ejs") //setting view engine, this fixes "Error: No default engine was specified and no extension was provided.", Here key is "view engine"

app.set("views", "./src/views/")//this fixes - Error: Failed to lookup view "index" in views directory "/Users/vsplash/Documents/mean_workspace/online_store/views"

app.get('/', function(req, response) {
    
    // response.send("Hello");
    response.render('index', {
        "nav": [{"name":"Add Product", "link": "products/add"},{"name":"Saif", "link": "saif"}, {"name":"Reshu", "link": "reshu"}]
});
});

var port = "8080";
app.listen(port, function(err) {
  
    if (err) {
        console.log('error listening @ '+port)
    }
    else {
        console.log('server listening @ '+port)
    }
});
    

app.use("/products", productsRoute);
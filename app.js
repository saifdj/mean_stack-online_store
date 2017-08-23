var express = require('express');
var productsRoute = require("./src/routes/productRoutes.js");
var mongodb = require("mongodb").MongoClient;


var app = express();

var mongoURL = "mongodb://localhost:27017/productsData";



app.use(express.static('public/template/')); //html file script tags search in this directory for dependencies


app.use(express.static("bower_components"));


app.set("view engine", "ejs") //setting view engine, this fixes "Error: No default engine was specified and no extension was provided.", Here key is "view engine"

app.set("views", "./src/views/")//this fixes - Error: Failed to lookup view "index" in views directory "/Users/vsplash/Documents/mean_workspace/online_store/views"

app.get('/', function (req, response) {


    var offersCarouselImages = [
        { "name": "iwatch", "class": "item active" },
        { "name": "earpods", "class": "item" },
        { "name": "mac", "class": "item" },
        { "name": "phone", "class": "item" },
        { "name": "spinner", "class": "item" },
        { "name": "watch", "class": "item" }]

    // response.send("Hello");
    //{"name":"Saif", "link": "saif"}, {"name":"Reshu", "link": "reshu"}



    //----------------------------------------------------------------------------------------
    mongodb.connect(mongoURL, function (err, db) {


        var collection = db.collection("products");
        
        collection.find({}).toArray(function (err, results) {


            response.render('index', {
                "nav": [{ "name": "Add Product", "link": "products/add" }],
                "offers": offersCarouselImages,
                "mongo_products": mongoURL,
                "mongo_results" : results

            });

        });


    });
    //----------------------------------------------------------------------------------------




});

var port = "8080";
app.listen(port, function (err) {

    if (err) {
        console.log('error listening @ ' + port)
    }
    else {
        console.log('server listening @ ' + port)
    }
});


app.use("/products", productsRoute);



//***
// To shut down mongo server, open shell "path/to/unarchived mongodb.tgz/bin/mongo" & switch to admin database using "use admin"
// then shutdown using "db.shutdownServer()", then run mongo deamon as usual, like "path/to/monogodb/dirctory/bin/mongod", this runs deamon on default port "27017", 
// we can run demon on other ports using "./bin/mongod --path 27018"
//
// We can also kill mongo demon using "kill processid", processid can be any number, e.g., "kill 1309", The command gives process id "pgrep mongo"
//
// Use this command to import data from json file into mongo db
// "./mongodatabase/bin/mongoimport --db filtersDB --collection searchParams --drop --file ~/Downloads/search_params.json"
// This creates new db/appends data to filtersDB and remove existing data in  searchParams collection
//
// To see data in a collection present in a DB
// first switch to database "use dbname", eg., "use filtersDB"
// then "db.collectionname.find()", e.g., "db.searchParams.find()", this logs the data in searchParams collection
//
// Use "sudo chown -R `id -un` /data/db" to give read write permissions to data/db directory
//*/
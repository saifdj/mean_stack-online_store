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



//*** SETUP & Shell
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



//*** Mongo filters using find
// Assume json as {"id": "2", "type" : 1, "firstName" : "Saif" } & DB name is "eventsDB" & Collection is "users"
// db.users.find({"firstName": "Saif"}) //we get record with matching name
// db.users.find({"type":{ $gt:2}}) //user with type > 2, can also use "$gte" for >=, Similarly $lt & $lte for less than & less than or equal to
// db.users.find({"type":{ $gt:1, $lt:3 }}) //for list of users with type between 1 & 3
// db.users.find({"type":{ $in:[1,4] }}) //for list of users with having ids either 1 OR 4
// "find()" also works with Strings as well, uptill now we have worked with integers
//
//*/


//*** Mongo save & insert
// 
// db.goof.save({id:1, foo:5}) //This creates a goof collection in current Database and insert the input with 2 key value pairs
// document is a single object in mongo terms., eg. document "{id:1, foo:5}", "db.goof.save" -> overwrites the entries in collection if id matches, where as "db.goof.insert" would throw an duplicate key error
// 
// 
// Mongo update, for commands check image present in ./resources
// db.goof.update({id:1}, {$rename:{'foo':'renamedFoo'}}) //updates the element with id 1, reanmes "foo" to "renamedFoo", similarly we have "$set" & "$unset" for adding & removing new properties respectively 
// To get the effect of update in all matching records we need one more argument "multi"
// db.users.update({type:1}, {$set:{'adminLevel':1}}, {multi:true} ) //this adds 'adminLevel':1, a new key value pair to all the records with user type 1
//
//*/
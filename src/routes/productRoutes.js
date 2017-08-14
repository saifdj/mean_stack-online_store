var express = require("express");

var router = express.Router();

var mongoURL = ""

router.route("/add").get(function(req, res) {

    // res.send("Add Product Page");
    res.render("addProduct", {
        "mongo_products" : mongoURL
    });
});

module.exports = router;

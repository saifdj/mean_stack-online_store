var express = require("express");

var router = express.Router();


router.route("/add").get(function(req, res) {

    // res.send("Add Product Page");
    res.render("addProduct", {});
});

module.exports = router;

var gulp = require("gulp");

var nodemon = require("gulp-nodemon");

// gulp.task("name", function() {
//  console.log("name task ran!!");
// });

var jsFiles = ['*.js', 'src/**/*.js']; 

gulp.task("inject", function () {

    var wiredep = require("wiredep").stream; //used to inject jquery and bootstrap in html file dynamically check bower:css & bower:js comments in html

    var inject = require("gulp-inject");

    var injectSrc = gulp.src(["./public/template/css/*.css", "./public/template/js/*.js"]) //from here custom css & js files are taken //"./public/bootstrap_templates/nice_to_meet_you/css/*.css", "./public/bootstrap_templates/nice_to_meet_you/js/*.js"
    var injectOptions = {
        ignorePath: "/public/bootstrap_templates/nice_to_meet_you" //this public path variable is not shown in .html file at custom css linking
    }//

    var options = {
        bowerJson: require("./bower.json"), //tell wiredep to look depdencencies in bower.json, our dependency is "bootstrap v^3.3.7"
        directory: "./bower_components", //path for dependencies, from here bootstrap core js and jquery files are taken by wiredep
        ignorePath: "../../bower_components" //this is used to ignore the given prefix for dynamically injected files in html
    } //

    return gulp.src("./src/views/*.html") //path for files which on which injection has to happen(code is added dynamically to these files) 
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest("./src/views"));

});


gulp.task("serve", ["inject"], function() {

    var options = {
        script : "app.js",
        delayTime : 1,
        watch : jsFiles
    }

    return nodemon(options).on("restart", function(event) {
        console.log("Restarting server... ")
    });
});
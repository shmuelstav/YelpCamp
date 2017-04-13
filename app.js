

var express = require("express");

var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));

var passport =  require("passport");

var flash = require("connect-flash");

app.use(flash());
var LocalStrategy = require("passport-local");
app.use(express.static(__dirname + "/public"))
app.set ("view engine" , "ejs");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/YelpCamp');
var Comment = require("./models/Comment.js");
var Campgrounds = require("./models/Campground.js");
var Users = require("./models/User.js");
var methodOverride = require('method-override');
app.use(methodOverride('_method'))

app.use(require('express-session')({
    secret :"my dog",
    resave: false,
    saveUninitialized : false
}));



app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(Users.authenticate()));

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



//-------------------------------------------------------------//
//                               Router
//-------------------------------------------------------------//

var campgroundsRouter = require ('./routs/campgrounds');
var commentsRouter = require ('./routs/comment');
var userRouter = require ('./routs/user');

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        console.log("is authentucated");
        return next();
    }
    else {
        res.redirect("/login");
    }

}


app.use (campgroundsRouter);
app.use (commentsRouter);
app.use (userRouter);


app.listen(63342,function(){
    console.log("server up -YelpCamp");
})



/*var campgrounds = [
 {name: "camp1" , image : "http://www.photosforclass.com/download/321487195"},
 {name: "camp2" , image : "http://www.photosforclass.com/download/5954480"},
 {name: "camp3" , image : "http://www.photosforclass.com/download/6090714876"},
 {name: "camp4" , image : "http://www.photosforclass.com/download/4369518024"},
 {name: "camp1" , image : "http://www.photosforclass.com/download/246477439"},
 {name: "camp2" , image : "http://www.photosforclass.com/download/6090170567"},
 {name: "camp3" , image : "http://www.photosforclass.com/download/6090714876"},
 {name: "camp4" , image : "http://www.photosforclass.com/download/4369518024"}
 ]*/

/**
 * Created by shmuel on 3/31/2017.
 */
var express = require('express');
var router = express.Router({mergeParams:true});
var Comment = require("../models/Comment.js");
var Campgrounds = require("../models/Campground.js");
var Users = require("../models/User.js");
var passport =  require("passport");

var LocalStrategy = require("passport-local");


//---------------------------------------------------------\\
//                             Authenticare routes
//----------------------------------------------------------\\
router.get("/register",function(req,res){
        res.render("login/register");
    }
);



router.post("/register", function(req, res){
    var newUser = new Users({username: req.body.username});
    Users.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("login/register");
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",function(req,res){
        res.render("login/login",{message : req.flash("error")});
    }
);



router.post('/login', passport.authenticate('local', { successRedirect: '/campgrounds',
    failureRedirect: '/login' }));

router.get("/logout",function(req,res){
        req.logOut();
        res.redirect("/campgrounds")
    }
);

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        console.log("is authentucated");
        return next();
    }
    else {
        req.flash("error","You have to login first")
        res.redirect("/login");
    }

}



module.exports = router;
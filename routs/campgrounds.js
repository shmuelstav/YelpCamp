/**
 * Created by shmuel on 3/26/2017.
 */
var express = require('express');
var router = express.Router({mergeParams:true});
var Comment = require("../models/Comment.js");
var Campgrounds = require("../models/Campground.js");



//---------------------------------------------------------\\
//                             Campground routes
//----------------------------------------------------------\\

router.get("/",function(req,res){
        res.render("landing");
    }
);


router.get("/campgrounds",function(req,res){
        Campgrounds.find({}, function (err,AllCampgrounds){
            if (err) {
                console.log("problem with Campgrounds");
            }
            else{
                res.render("campground/index",{campgrounds :AllCampgrounds});
            }
        })
    }
);


router.post("/campgrounds",isLoggedin,function(req,res){
        var author = {
            id : req.user._id,
            username : req.user.username
        }
        Campgrounds.create({name: req.body.name,image:req.body.image,description:req.body.description,author :author},function(err,newcamp){
            if(err){
                console.log("problem to add new canp");
            }
            else{
                console.log(newcamp);
            }
        });
        res.redirect("/campgrounds");
    }
);

router.get("/campgrounds/new",function(req,res){
        res.render("campground/new");
    }
);





router.get("/campgrounds/:id",function(req,res){
    /* Campgrounds.findById(req.params.id,function(err,foundcampground){
     if (err){
     console.log("campground not found");
     }
     else {*/
    Campgrounds.findOne({ _id: req.params.id })
        .populate('comments').exec(function (err, foundcampground) {
        if (err){
            console.log();
        }
        else{
            res.render("campground/show",{campground :foundcampground});
        }
    })
});

router.get("/campgrounds/:id/edit",isCampgroundAuothor,function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.render("campground/edit",{campground :foundcampground});
        }
    })

});


router.post("/campgrounds/:id/edit",function(req,res){
    Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundcampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

router.delete("/campgrounds/:id",function(req,res){
    Campgrounds.findByIdAndRemove(req.params.id,req.body.campground,function(err,foundcampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});




function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        console.log("is authentucated");
        return next();
    }
    else {
        req.flash("error","Most loggin before")
        res.redirect("/login");
    }
}


function isCampgroundAuothor(req,res,next){
    if(!req.isAuthenticated()){
        res.redirect("/login");
    }
    else {
        Campgrounds.findById(req.params.id, function (err, foundcampground) {
            if (err) {
                res.send("campground not found");
            }
            else {
                if (foundcampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");

                }
            }
        })
    }
}


module.exports = router;
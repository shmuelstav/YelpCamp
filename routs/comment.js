/**
 * Created by shmuel on 3/26/2017.
 */
var express = require('express');
var router = express.Router({mergeParams:true});
var Comment = require("../models/Comment.js");
var Campgrounds = require("../models/Campground.js");




//---------------------------------------------------------\\
//                             Comments routes
//----------------------------------------------------------\\

router.get("/campgrounds/:id/comments/new",isLoggedin,function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if (err){
            console.log("campground not found");
        }
        else{
            res.render("comment/new",{campground :foundcampground});
        }
    })

})


router.post("/campgrounds/:id/comments",function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if (err){
            console.log("campground not found");
        }
        else{
            console.log(foundcampground);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log("problem to create new comment");
                }
                else{
                    console.log(req.user.username);
                    comment.author.id = req.user._id ;
                    comment.author.username = req.user.username ;
                    comment.save();
                    foundcampground.comments.push(comment);
                    console.log(comment);
                    foundcampground.save();
                    console.log(foundcampground);
                    res.redirect('/campgrounds/'+foundcampground._id);
                }
            })
        }
    })

})



router.get("/campgrounds/:id/comments/:commentid/edit",function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if (err){
            console.log("campground not found");
        }
        else{
            Comment.findById(req.params.commentid,function(err,foundcomment) {
                if (err) {
                    console.log("campground not found");
                }
                else {
                    res.render("comment/edit", {campground: foundcampground, comment: foundcomment});
                }
            })
    }
    })
});


router.post("/campgrounds/:id/comments/:commentid/edit",function(req,res){
    Comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,updateComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


router.delete("/campgrounds/:id/comments/:commentid/edit",isLoggedin,isCampgroundAuothor,function(req,res){
   Comment.findByIdAndRemove(req.params.commentid,req.body.campground,function(err,foundcampground){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("back");
        }
    })
});


function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        console.log("is authentucated");
        return next();
    }
    else {
        req.flash("error","You have to login first");
        res.redirect("/login");
    }
}

function isCampgroundAuothor(req,res,next){
        Comment.findById(req.params.commentid, function (err, foundcomment) {
            if (err) {
                res.send("comment not found");
            }
            else {
                if (foundcomment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");

                }
            }
        })
}

module.exports = router;
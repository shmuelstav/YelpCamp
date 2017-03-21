

var express = require("express");

var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));

app.set ("view engine" , "ejs");

//var Comment = require("./models/Comment.js");
var Campgrounds = require("./models/Campground.js");


//---------------------------------------------------------\\
//                             Campground routes
//----------------------------------------------------------\\

app.get("/",function(req,res){
    res.render("landing");
 }
);


app.get("/campgrounds",function(req,res){
    Campgrounds.find({}, function (err,AllCampgrounds){
     if (err) {
        console.log("problem with Campgrounds");
     }
     else{
        res.render("index",{campgrounds :AllCampgrounds});
     }
     })
    }
);


app.post("/campgrounds",function(req,res){
        Campgrounds.create({name: req.body.name,image:req.body.image,description:req.body.description},function(err,newcamp){
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

app.get("/campgrounds/new",function(req,res){
        res.render("new");
    }
);

app.get("/campgrounds/:id",function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if (err){
            console.log("campground not found");
        }
        else {
            console.log(foundcampground.name);
            res.render("show",{campground :foundcampground});
        }
    })

    }
);

//---------------------------------------------------------\\
//                             Comments routes
//----------------------------------------------------------\\

app.get("/campgrounds/:id/comments/new",function(req,res){
    res.send("This will be new route");
})


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

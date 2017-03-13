

var express = require("express");

var app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));

app.set ("view engine" , "ejs");

var campgrounds = [
    {name: "camp1" , image : "http://www.photosforclass.com/download/321487195"},
    {name: "camp2" , image : "http://www.photosforclass.com/download/5954480"},
    {name: "camp3" , image : "http://www.photosforclass.com/download/6090714876"},
    {name: "camp4" , image : "http://www.photosforclass.com/download/4369518024"},
    {name: "camp1" , image : "http://www.photosforclass.com/download/246477439"},
    {name: "camp2" , image : "http://www.photosforclass.com/download/6090170567"},
    {name: "camp3" , image : "http://www.photosforclass.com/download/6090714876"},
    {name: "camp4" , image : "http://www.photosforclass.com/download/4369518024"}
]


function consCampground(name,url){
  this.name = name ;
   this.image = url;

};

app.get("/",function(req,res){
    res.render("landing");
 }
);


app.get("/campgrounds",function(req,res){
        res.render("campground",{campgrounds :campgrounds});
    }
);


app.post("/campgrounds",function(req,res){
        campgrounds.push(new consCampground(req.body.name,req.body.image));
        res.render("campground",{campgrounds :campgrounds});
    }
);
app.get("/campgrounds/new",function(req,res){
        res.render("new");
    }
);

app.listen(63342,function(){
    console.log("server up -YelpCamp");
})


var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var middleware = require("../middleware");

router.get("/", function(req, res){
    //Get all campgrounds from DB
    Product.find({}, function(err, allProducts){
       if(err){
            console.log(err);
       } else {
           res.send({ 
                here: 'is',
                some: 'cool',
                data: '.'
    });
           
        //   res.render("campgrounds/index", {products:allProducts});
       } 
    });

});

 
//CREATE - add new product to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const desc = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
        
    }
    var newProduct = {name: name, price: price, image: image, description: desc, author: author};
    //Create a new Product and save to DB
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err);
       } else {
               res.redirect("/");
       } 
    });
    // products.push(newProduct);
    // res.redirect("/");
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){

});


//SHOW - shows more info about the campground
router.get("/:id", function(req, res){
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
        if(err){
            console.log(err);
       } else {
               console.log(foundProduct);
            //   res.render("campgrounds/show", {campground: foundProduct});
       } 
    });
    req.params.id
});

//Edit campground Route
router.get("/:id/edit", middleware.checkProductOwnership, function(req, res){
   Product.findById(req.params.id, function(err, foundProduct){
       if(err){
            console.log(err);
       } else {
        //  res.render("campgrounds/edit", {product: foundProduct});
       }
    });
});
//Update campground Route
router.put("/:id", middleware.checkProductOwnership, function(req, res){
   //find and update the correct campground
   Product.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
    //redirect somewhere (show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//Destroy Product Route
router.delete("/:id", middleware.checkProductOwnership, function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;
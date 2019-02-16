var express = require("express");
var router = express.Router();
var Product = require("../models/product");
// var middleware = require("../middleware");

router.get("/", function(req, res){
    //Get all products from DB
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
router.post("/", function(req, res){
    console.log(req.body);
    const productName = req.body.productName;
    // const price = req.body.price;
    const image = req.body.image;
    // const desc = req.body.description;
    // const author = {
        // id: req.user._id,
        // username: req.user.username
        
    // };
    var newProduct = {productName: productName, image: image};
    //Create a new Product and save to DB
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err);
      } else {
              res.redirect("/");
      } 
    });
});

//NEW - show form to create new campground
// router.get("/new", function(req, res){

// });


//SHOW - shows more info about the campground
// router.get("/:id", function(req, res){
//     Product.findById(req.params.id).populate("comments").exec(function(err, foundProduct){
//         if(err){
//             console.log(err);
//       } else {
//               console.log(foundProduct);
//             //   res.render("campgrounds/show", {campground: foundProduct});
//       } 
//     });
//     req.params.id
// });

//Edit product Route
// router.get("/:id/edit",  function(req, res){
//   Product.findById(req.params.id, function(err, foundProduct){
//       if(err){
//             console.log(err);
//       } else {
//         //  res.render("campgrounds/edit", {product: foundProduct});
//       }
//     });
// });
//Update campground Route
// router.put("/:id", function(req, res){
//   //find and update the correct campground
//   Product.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//       if(err){
//           res.redirect("/campgrounds");
//       } else {
//     //redirect somewhere (show page)
//           res.redirect("/campgrounds/" + req.params.id);
//       }
//   });
// });

//Destroy Product Route
// router.delete("/:id", function(req, res){
//     Product.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/campgrounds");
//         } else {
//             res.redirect("/campgrounds");
//         }
//     })
// });

module.exports = router;
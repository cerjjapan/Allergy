var express = require("express");
var router = express.Router();
var Product = require("../models/product");
// var middleware = require("../middleware");

 
//CREATE - add new product to DB
router.post("/", function(req, res){
    console.log(req.body);
    const productName = req.body.productName;
    const image = req.body.image;
    const comment = req.body.comment;
    var newProduct = {productName: productName, image: image, comment: comment};
    //Create a new Product and save to DB
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err);
      } else {
              res.redirect("/");
      } 
    });
});



// SHOW - Delivers product data to React-native
router.get("/:id", function(req, res){
    Product.find({userId: req.params.id}).exec(function(err, foundProducts){
        if(err){
            console.log(err);
      } else {
              console.log(foundProducts);
              res.send(foundProducts);
      } 
    });
});

//DELETE - Deletes product from database
router.delete("/:id", function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Product deleted");
        }
    })
});

//Update product route
router.put("/:id", function(req, res){
   //find and update the correct product
   console.log(1, req.body.product)
   Product.findByIdAndUpdate(req.params.id, req.body.product, {new: true}, function(err, updatedProduct){
       console.log(2, updatedProduct)
       if(err){
          console.log(err);
       } else {
         res.send(updatedProduct);
       }
   });
});

module.exports = router;
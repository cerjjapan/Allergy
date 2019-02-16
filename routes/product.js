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



module.exports = router;
const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const Comment = require("../models/comment");
const Product = require("../models/product");
// const middleware = require("../middleware");


//Comments New

router.get("/", function(req, res){
    //Find user by ID
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        } else {
            // res.render("comments/new", {product: product});
            res.send({
                here: 'is',
                some: 'cool',
                data: '.'
        });
    };
});


// //Comments Create

router.post("/", function(req, res){
    //Lookup product using id
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
            return
        } else {
 //create new comments
            Comment.create(req.body.comment, function(err, comment){
                 if(err){
                    console.log("error", "Something went wrong");
                    console.log(err);
                } else {
//add username and id and save comment
                  comment.author.id = req.user._id;  
                  comment.author.username = req.user.username;
                  comment.save();
 //connect new comments to product
                    product.comments.push(comment);
                    product.save();
//redirect  to campground show page          
                    res.redirect("/product/" + product._id);
                }
            });
        }
    });
});
// //Comments edit route
// router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
//     Comment.findById(req.params.comment_id, function(err, foundComment){
//         if(err){
//             res.redirect("back");
//         } else {
//             res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
//         }
//     });
// });

// //Comments update route

// router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//       if(err){
//           res.redirect("back");
//       } else {
//     //redirect somewhere (show page)
//           res.redirect("/campgrounds/"  + req.params.id);
//       }
//   });
// });

// //Comments destroy route

// router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndRemove(req.params.comment_id, function(err){
//         if(err){
//             res.redirect("back");
//         } else {
//             req.flash("success", "Comment deleted");
//             res.redirect("/campgrounds/"  + req.params.id);
//         }
//     })
 });

 module.exports = router;
var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Comments New

router.get("/new", middleware.isLoggedIn, function(req, res){
    //Find campground by ID
    User.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments Create

router.post("/", middleware.isLoggedIn, function(req, res){
    //Lookup campground using id
    User.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
 //create new comments
            Comment.create(req.body.comment, function(err, comment){
                 if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
//add username and id and save comment
                  comment.author.id = req.user._id;  
                  comment.author.username = req.user.username;
                  comment.save();
 //connect new comments to campground
                    campground.comments.push(comment);
                    campground.save();
//redirect  to campground show page          
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});
//Comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//Comments update route

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else {
    //redirect somewhere (show page)
           res.redirect("/campgrounds/"  + req.params.id);
       }
   });
});

//Comments destroy route

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/"  + req.params.id);
        }
    })
});

module.exports = router;
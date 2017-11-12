var express = require("express");
var passport = require("passport");
var User = require("../models/user");
var router = express.Router();
//===============
//auth routes
//show rigister form
//root route
router.get("/", function(req,res) {
   res.render("landing"); 
});
router.get("/register",function(req, res) {
    res.render("register");
});
router.post("/register",function(req, res) {
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show log in form
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login",passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req, res) {
});
//add log out route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success","Logged you out!"); 
    res.redirect("/campgrounds");
});

module.exports = router;
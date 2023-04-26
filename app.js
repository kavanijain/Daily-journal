//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");

const homeStartingContent = "Hey there welcome to this journal! we can create posts over here with the help of /compose in home address. then that post will be shown on home page.we can access full version of the post through /posts/title.here are about, contact pages on navbar to know more..";
const aboutContent = "🤨🤔";
const contactContent = "You can contact us on given platforms . Thank You!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/" , function(req,res){
  res.render("home",{content: homeStartingContent, posts:posts});

});
app.get("/about" , function(req,res){
  res.render("about",{content: aboutContent});

});
app.get("/contact" , function(req,res){
  res.render("contact",{content: contactContent});

});
app.get("/compose" , function(req,res){
  res.render("compose");
})
app.post("/compose", function(req,res){
  const post={
    title : req.body.posttitle,
    body : req.body.postbody
  };
  posts.push(post);
  res.redirect("/");
})
app.get("/posts/:postname", function(req,res){
  const requestedtitle = _.lowerCase(req.params.postname);
  posts.forEach(function(post){
    const storedtitle= _.lowerCase(post.title);
    
    if(storedtitle===requestedtitle){
      res.render("post" , {
        title: post.title,
        content: post.body
      });
    }
    
  })
})

app.listen(4000, function() {
  console.log("Port: 4000");
});

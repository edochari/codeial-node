const Post = require('../models/post')

module.exports.home=function(req,res){
    // console.log("cookie",req.cookies);
    // res.cookie('user_id',78);

    Post.find({}).populate('user').exec()
    .then((posts)=>{
        return res.render('home',{
            title:'Home',
            posts:posts
        })
    })
  

    
}


const Post = require('../models/post')


module.exports.Post = function(req,res){
     Post.create(req.body);
    console.log(req.body.content);
    return res.render('home',{
        title:'Home'
    })
}
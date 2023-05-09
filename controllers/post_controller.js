const Post = require('../models/post')
const Comment = require('../models/Comment');

module.exports.create = function(req,res){
     Post.create({
        content:req.body.content,
        user:req.user._id,
     }).then((post)=>{
        
        return res.redirect('back');
     })
     .catch((err)=>{console.log("error in creating post"); });
    
}


module.exports.destroy = function(req,res){
   Post.findById(req.params.id).then((post)=>{
      //checking whether the user is one who created post
      // .id converting the object into string
      if(post.user == req.user.id){
            Post.deleteOne({_id:req.params.id})
            .then(()=>{
               console.log("req",req.user.id+" "+post.user)
               console.log("post is deleted successfully")
            })
            Comment.deleteMany({post:req.params.id})
            .then(()=>res.redirect('back'))

      }else{
         return res.redirect('back');
      }
   })
}


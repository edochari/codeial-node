const Post = require('../models/post')
const Comment = require('../models/Comment');

module.exports.create = async function(req,res){
   try{
   let post =await Post.create({
        content:req.body.content,
        user:req.user._id,
     })

     if(req.xhr){
      return res.status(200).json({
         data:{
            post:post
         },
         message:"Post created !"
      })
     }
        
      return res.redirect('back');
   }catch(err){console.log("error in creating post ",err); };
    
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
            if(req.xhr){
               return res.status(200).json({
                  data:{
                     post_id:req.params.id
                  },message : 'post deleted successfully'

               }
               )
            }
            Comment.deleteMany({post:req.params.id})
            .then(()=>res.redirect('back'))

      }else{
         return res.redirect('back');
      }
   })
}


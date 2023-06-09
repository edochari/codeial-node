const Post = require('../../../models/post');

module.exports.index=async function(req,res){
   
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        })
    return res.json(200,{
        message:'List of posts',
        posts:posts,

    })
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
          return res.json(401,{
            message:'You cannot delete the post'
          })
       }
    })
 }
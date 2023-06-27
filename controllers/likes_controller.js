const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/Comment');

module.exports.toggleLike = async function(req,res){
    try{
      let likeable;
      let deleted = false;

      if(req.query.type == 'Post')
      {
          likeable = await Post.findById(req.query.id).populate('likes');
      }else{
          likeable = await Post.findById(req.query.id).populate('likes');
      }
      
      let existingLike = likeable.findOne({
        likeable:req.query.id,
        user:req.user._id,
        onModel:req.query.type
    })
      if(existingLike){
         likeable.likes.pull(existingLike._id);
         likeable.save();
         deleted = true;
         existingLike.remove();
      }else{
        let newLike = Like.create({
            likeable:req.query.id,
            user:req.user._id,
            onModel:req.query.type
        })

        likeable.likes.push(like._id);
        likeable.save();
        
      }
      return res.json(200,{
        message:'request successful'
      })
    }catch(err){
        console.log("Internal server error",err);
        return res.json(500,{
            message:'Internal server error'
        })
    }
}
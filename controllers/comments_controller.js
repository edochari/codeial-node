const Comment = require('../models/Comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id,
        }).then((Comment)=>{
            post.comments.push(Comment);
            post.save();
            return res.redirect('/');
        })
    })
}

module.exports.destroy = function(req,res){
    console.log("destroyed");
    Comment.findById(req.params.id).then((comment)=>{
        console.log("destroy");
        if(comment.user == req.user.id){
        let postId = comment.post;
        Post.deleteOne({_id:req.params.id})
            .then(()=>{
               
               console.log("comment is deleted successfully");
            })
        Post.findByIdAndUpdate(postId,{$pull :{comments:req.params.id}}).then((post)=>{
            return res.redirect('back');
        })
    }else{
        return res.redirect('back');
    }

    })
}


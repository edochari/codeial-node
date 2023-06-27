


const Comment = require('../models/Comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue =  require("../config/kue");
const commentEmailWorker = require('../workers/comment_email_worker');
module.exports.create = async function(req, res){
    console.log("comments create");
    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            
            post.save();
            
             comment = await comment.populate('user', 'name email');
            
            let job = queue.create('emails',comment).save(function(err){
                if(err){console.log("Error in creating queue",err);return ;}

                console.log("job is",job.id);
            })
            
            


            // req.flash('success', 'Comment published!');

            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
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


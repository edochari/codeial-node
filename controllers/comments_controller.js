
// const Comment = require('../models/Comment');
// const Post = require('../models/post');
// const commentsMailer = require('../mailers/comments_mailer');
// module.exports.create = async function(req, res){
//     console.log("comments create");
//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             post.save();
            
//             comment = await comment.populate('user', 'name email').execPopulate();
//             commentsMailer.newComment(comment);
//             if (req.xhr){
                
    
//                 return res.status(200).json({
//                     data: {
//                         comment: comment
//                     },
//                     message: "Post created!"
//                 });
//             }


//             req.flash('success', 'Comment published!');

//             res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

//             // send the comment id which was deleted back to the views
//             if (req.xhr){
//                 return res.status(200).json({
//                     data: {
//                         comment_id: req.params.id
//                     },
//                     message: "Post deleted"
//                 });
//             }


//             req.flash('success', 'Comment deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'Unauthorized');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


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
            
            // if (req.xhr){
                
    
            //     return res.status(200).json({
            //         data: {
            //             comment: comment
            //         },
            //         message: "Post created!"
            //     });
            // }


            // req.flash('success', 'Comment published!');

            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}
// module.exports.create = function(req,res){
//     Post.findById(req.body.post).then((post)=>{
//         Comment.create({
//             content:req.body.content,
//             post:req.body.post,
//             user:req.user._id,
//         }).then((Comment)=>{
//             post.comments.push(Comment);
//             post.save();
//             return res.redirect('/users/profile');
//         })
//     })
// }

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


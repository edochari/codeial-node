const User = require('../models/user');
const Post = require('../models/post')


module.exports.profile=async function(req,res){
    // console.log("cookie",req.cookies);
    // res.cookie('user_id',78);
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        })
        let users = await  User.find({})
        
        return res.render('user',{
            title:'user',
            posts:posts,
            all_users:users,
        }) 
    }catch(err){
        console.log('Error',err);
        return ;
    }
}


module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log("Multer Error",err)};
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    User.avatar =User.avatarPath +'/'+req.file.filename;

                }
                user.save();
                return res.redirect('back');
            })
                
            
        }catch(err){
            {console.log("error in updating user ",err); };
        }
       
    }else{
        return res.status(401).send("Unauthorized");
    }


}

module.exports.signUp = function (req, res) {
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'codeial | sign up'
    });
}

// module.exports.signIn = function (req, res) {
//     console.log("user is",req.params);
//     if(req.isAuthenticated())
//     {
//         return res.redirect('/users/profile');
//     }
//     return res.render('home', {
//         title: 'codeial | sign in'
//     });
// }

// get the sign up data
module.exports.create = function (req, res) {
    console.log("signing up");
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            User.create(req.body).then((user) => {
                console.log("User successfully created");
                return res.redirect('/');
            }).catch((err) => {
                console.log("Error while creating user");
            })
        }
        else {
            return res.redirect('back');
        }
    }).catch((err) => {
        console.log("Error while finding user");
    })


}


module.exports.createSession = function (req, res) {
   
    req.flash('success','Logged in successfully');
    console.log(req.flash);
   return res.redirect('/users/profile');
}

module.exports.destroySession = function (req, res) {
   req.logout(function(err) {
    if (err) { console.log("Error while logging out")}
    req.flash('success','you have logged out');
    res.redirect('/');
  });
  
}
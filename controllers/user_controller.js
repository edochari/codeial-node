const User = require('../models/user');

module.exports.profile = function (req, res) {
    User.findById(req.params.id).then((user)=>{
        return res.render('user', {
            title: 'profile',
            profile_user:user,
        })
    })
   
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body).then(()=>{
            console.log("successfully updated");
            return ;
        })
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

module.exports.signIn = function (req, res) {
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'codeial | sign in'
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            User.create(req.body).then((user) => {
                console.log("User successfully created");
                return res.redirect('/users/sign-in');
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

// sign in and create session
module.exports.createSession = function (req, res) {
   return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
   req.logout(function(err) {
    if (err) { console.log("Error while logging out")}
    res.redirect('/users/sign-in');
  });
  
}
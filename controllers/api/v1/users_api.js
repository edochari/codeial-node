const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        console.log('User is waste',user);
        if(!user || user.password != req.body.password){
            console.log(req.body.password +" "+user.password);
            return res.json(422,{
                message:'Invalid username or password'
            })
        }

        return res.json({
            message:'sign in successful here is your token',
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:100000})
            }
        })
    }catch(err){
        console.log('******',err);
        return res.json(500,{
            message:'Internal server error'
        })
    }
}


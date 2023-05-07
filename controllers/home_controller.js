module.exports.home=function(req,res){
    console.log("cookie",req.cookies);
    res.cookie('user_id',78);
    return res.render('home',{
        title:'Home'
    })
}


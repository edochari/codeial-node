const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log("new Comment");
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'hari.jsdeveloper@gmail.com',
        to:comment.user.email,
        subject:'New comment published',
        html:htmlString,
    },(err,info)=>{
        if(err){console.log("Error in sending mail",err); return ;}
        console.log("Message sent",info);
        return ;

    })
}
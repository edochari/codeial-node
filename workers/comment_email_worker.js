const Queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

Queue.process('emails',function(job,done){
    console.log("emails worker is processing data",job.data);
    commentsMailer.newComment(job.data);
    done();


})
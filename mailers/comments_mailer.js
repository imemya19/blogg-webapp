const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) =>{
    // console.log('inside newcomment mailer');

    const HTMLSTring = nodemailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from: 'somyaagrawal.ime@gmail.com',
        to: comment.author.email,
        subject: 'new comment pubished!',
        // text: 'I hope this message gets delivered when you publish a comment!'
        // html:'<div>helloo</div>'
        html:HTMLSTring
    }, (err, info) => {
        if(err){
            console.log('err in sending mail',err); return;
        }
        console.log('mail sent',info);
        return;
    });
}
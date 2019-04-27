const nodemailer = require('nodemailer');
/**
* Here we are configuring our SMTP Server details.
* SMTP is mail server which is responsible for sending and recieving email.
*/
exports.sendEMailFunction = url => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userName,
            pass: process.env.Password
        },
    });
    const mailOptions = {
        from: process.env.userName,          // sender address
        to: process.env.userName,           // list of receivers
        subject: 'send mail from node js',    // Subject line
        text: 'Your Email verification link is:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log('error while sending mails-- ', err);
        else
            console.log('result on sending mails-- ', info);
    });
}
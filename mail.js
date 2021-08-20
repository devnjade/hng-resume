const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const auth = {
    auth: {
        api_key: 'f015e34d56fb52f6d38f6b995aaca966-9776af14-e369e738',
        domain: 'https://api.mailgun.net/v3/sandboxd7c25149da9d474182eedf87dbf7faa7.mailgun.org'
    }
};
const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text, cb) => {
    const mailOptions = {
        sender: name,
        from: email,
        to: 'adecancode@gmail.com',
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

module.exports = sendMail;
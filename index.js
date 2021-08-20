require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const nodemailer = require('nodemailer')


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'html');

app.get("/", function (req, res){
    res.sendFile(__dirname + '/public/view/index.html');
});

app.post('/contact', (req, res) => {

    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    })
  
    // Specify what the email will look like
    const mailOpts = {
      from: `${req.body.name}`, // This is ignored by Gmail
      to: process.env.GMAIL_USER,
      subject: 'New message from contact form at tylerkrys.ca',
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }
  
    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        res.render('contact-failure') // Show a page indicating failure
      }
      else {
        res.render('contact-success') // Show a page indicating success
      }
    })
  })


app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))
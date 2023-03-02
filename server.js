//boiler plate code for starting a server
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const ejs = require("ejs");
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));


app.listen( port , function() {
  console.log(`Server listening on port ${port}`);

});

/*************************************************************************************/

//setting up  get requests
app.get("/",function (req,res){
  res.render("registration");
});

/*************************************************************************************/
//setting up post requests
app.post('/send-mail', (req, res) => {
  const name = req.body.name;
  const roll_number = req.body.roll_number;
  const branch = req.body.branch;
  const section= req.body.section;
  const email= req.body.email;
  const phone= req.body.phone;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '20131a04l4@gvpce.ac.in',
      pass: 'gvpcoe123'
    }
  });

  const mailOptions = {
    from: '20131a04l4@gvpce.ac.in',
    to: '20131a04l4@gvpce.ac.in',
    subject: 'New message from VLSID Club registration form',
    text: `Name: ${name}\nroll number: ${roll_number}\nBranch: ${branch}\nSection: ${section}\nEmail: ${email}\nPhone number: ${phone}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error sending message');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Message sent successfully');
    }
  });
});

//boiler plate code for starting a server
require('dotenv').config()
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

const vacacantrole=["00","00","00","00","00","00"];
/*************************************************************************************/

//setting up  get requests
app.get("/",function (req,res){
  res.redirect("/Vacancies");
});

app.get("/Vacancies",function (req,res){
  res.render("Vacancies",{vacacantrole: vacacantrole});
});
app.get("/vac-com",(req, res)=>{
  res.render("vac-com");
});

app.post('/registration', function(req, res) {
  const value = req.body.btn;
  const vac=req.body.vac;
  res.render('registration', { role : value, vac: vac });
});
/*************************************************************************************/
//setting up post requests


app.post('/send-mail', (req, res) => {
  const name = req.body.name;
  const roll_number = req.body.roll_number;
  const role =req.body.role;
  const branch = req.body.branch;
  const section= req.body.section;
  const email= req.body.email;
  const phone= req.body.phone;
  const pass=process.env.gmailPass;

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '20131a04l4@gvpce.ac.in',
      pass: pass
    }
  });

  const mailOptions = {
    from: '20131a04l4@gvpce.ac.in',
    to: '20131a04l4@gvpce.ac.in',
    subject: `Recruitment: New application recieved`,
    text: `VLSID Club registration form\n\nName: ${name}\nroll number: ${roll_number}\nRole: ${role}\nBranch: ${branch}\nSection: ${section}\nEmail: ${email}\nPhone number: ${phone}`
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



app.post("/update-vac",(req,res)=>{

  if(vacacantrole.length){
    vacacantrole.length=0;
  }
  const role =req.body;


  [role.role0, role.role1, role.role2, role.role3, role.role4, role.role5].forEach(role => {
    if(role=="0" || role=="")
    vacacantrole.push("00");
    else
    vacacantrole.push(role);
});
 res.redirect("vacancies");
});

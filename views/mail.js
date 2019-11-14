const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ivomofor@gmail.com',
    pass: 'mademan101'
  }
});

const mailOptions = {
  from: 'ivomofor@gmail.com',
  to: <%= data.email %>,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
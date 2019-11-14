
const {contactDB, userDB} = require('./model/db');
const nodemailer = require('nodemailer');
module.exports = (app)=>{
    app.get('/', (req, res)=>{
        res.render('pages/home');
    });
    app.get('/service', (req, res)=>{
        res.render('pages/service');
    });
    app.get('/team', (req, res)=>{
        res.render('pages/team');
    });
    app.get('/work', (req, res)=>{
        res.render('pages/work');
    });
    app.get('/about', (req, res)=>{
        res.render('pages/about');
    });
    app.get('/contact', (req, res)=>{
        res.render('pages/contact');
    });
    app.get('/terms',(req, res)=>{
        res.render('pages/terms');
    });

    // Contact form 
    app.post('/contact',(req, res)=>{
        const name = req.body.firstName;
        const email = req.body.email;
        const message = req.body.message;
        const emailMessage = `Hi ${name}, \n\nThank you for contacting us.
        \n\nWe will respond back to you via this email: ${email}.\n\nYour enquiry is: \n ${message}\n. Have a nice day.`
        console.log(emailMessage);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '	info.adevon@gmail.com',
                pass: '#Wellcome101'
            }
        });
        const emailOptions = {
            from: 'Adevon <info.adevon@gmail.com>',
            to: email,
            subject: 'Application Development Operations(Adevon);',
            text: emailMessage,
        }
        transporter.sendMail(emailOptions, (error, info)=>{
            if(error) {
                console.log(error);
            } else {
                console.log('Message Sent: '+info.response);
                console.log('Email Message: '+emailMessage);
            }
        });
        const contact = new contactDB(req.body);
        contact.save()
          .then(data => {
              console.log(req.flash('success_msg', 'Thank you for contacting us. We will get back to you soon.'));
              res.redirect('contact');
          })
          .catch(error =>{
                console.log(req.flash('error_msg', 'Message could not be sent :('));
                res.status(422);
                res.render('pages/contact');
           }); 
    }); 
};
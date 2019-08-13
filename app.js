const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', function(req, res){
    res.render('index', { title: 'API'});
});

app.get('/api/about', function(req, res){
    res.render('about', { title: 'ABOUT'});
});
app.post('/api/about', function(req, res){
    var data = JSON.stringify(req.body)
    var secondData = JSON.parse(data)
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: secondData.email,
            pass: secondData.password
        }
    });
    let mailOptions = {
        from: secondData.email,
        to: '80974878806cok@gmail.com',
        subject: 'Test',
        text: "Hi" +  " " + secondData.firstName
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });

    res.end("Look your gmail");
});
app.get('/api/contact', function(req, res){
    res.render('contact', { title: 'CONTACT'});
});

app.listen(3000, function(){
    console.log('app listening at localhost:3000');
});
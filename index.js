require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 80;


app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const emails = req.body.emails;
  const subjects = req.body.subjects;
  const messages = req.body.messages;
  console.log('Emails:', emails);
  console.log('Subjects:', subjects);
  console.log('Messages:', messages);

  // Send emails
  emails.forEach((email, index) => {
    sendEmail(email, subjects[index], messages[index]);
  });

  res.render('index');
});


function sendEmail(email, subject, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anuragrajak251@gmail.com',
      pass: 'gjgekwabjbvpvmhp',
    },
  });

  const mailOptions = {
    from: 'anuragrajak251@gmail.com',
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log(`Email sent to ${email}`);
    }
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

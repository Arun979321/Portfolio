const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./')); // This serves your HTML file

// Setup Email Transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/contact', (req, res) => {
  const { email, message } = req.body;
  
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${email}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.status(200).send('Email sent successfully!');
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
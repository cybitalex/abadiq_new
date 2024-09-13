const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create OAuth2 client
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});

async function createTransporter() {
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log('Error in getAccessToken:', err);
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    console.log('Access token created successfully');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken
      }
    });

    return transporter;
  } catch (error) {
    console.log('Error in createTransporter:', error);
    throw error;
  }
}

app.post('/api/contact', async (req, res) => {
  try {
    const transporter = await createTransporter();
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL,
      to: 'alex@cybitnetworks.com',
      subject: `New contact from ${name}: ${subject}`,
      text: `From: ${name} (${email})\n\n${message}`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + result.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

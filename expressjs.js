const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();
const axios = require("axios"); // Add axios for API calls

const app = express();
const port = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Google OAuth setup
const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).send("API is running");
});

async function createTransporter() {
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("Error in getAccessToken:", err);
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    console.log("Access token created successfully");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    return transporter;
  } catch (error) {
    console.log("Error in createTransporter:", error);
    throw error;
  }
}

// Gmail OAuth email sending route
app.post("/api/contact", async (req, res) => {
  try {
    const transporter = await createTransporter();
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL,
      to: "alex@cybitnetworks.com",
      subject: `New contact from ${name}: ${subject}`,
      text: `From: ${name} (${email})\n\n${message}`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + result.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
});

// Brevo API email sending route
app.post("/api/brevo-contact", async (req, res) => {
  try {
    console.log("Brevo contact request received:", req.body);

    const { name, email, subject, message } = req.body;

    if (!process.env.BREVO_API_KEY) {
      console.error("Brevo API key is missing in server environment");
      return res.status(500).json({
        success: false,
        message: "Server configuration error: Brevo API key missing",
      });
    }

    const emailData = {
      to: [
        {
          email: "info@abadiq.com", // Replace with recipient email
          name: "ABADIQ",
        },
      ],
      sender: {
        email: "noreply@abadiq.com", // Use a fixed sender email
        name: "ABADIQ Website Contact Form",
      },
      subject: subject || "New message from ABADIQ website",
      htmlContent: `
        <h3>New message from ABADIQ website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: {
        email: email,
        name: name,
      },
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
      }
    );

    console.log("Brevo API response:", response.data);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(
      "Error sending email via Brevo:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.response?.data?.message || error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

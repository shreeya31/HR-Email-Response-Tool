// server.js

const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(express.json()); // To parse JSON bodies

// --- Email Templates ---
const selectionTemplate = `Dear [Candidate Name],

We are pleased to inform you that you have been selected for the position of [Position].

Please reply to this email to confirm your acceptance.

Best regards,
HR Team`;

const rejectionTemplate = `Dear [Candidate Name],

Thank you for applying for the position of [Position].

We regret to inform you that we have decided to move forward with other candidates.

Best regards,
HR Team`;


// --- Nodemailer Transporter Setup ---
// Uses environment variables for security
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// --- API Endpoint to Send Email ---
app.post('/send-email', async (req, res) => {
    const { status, name, email, position } = req.body;

    // Basic server-side validation
    if (!status || !name || !email || !position) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    let subject = '';
    let emailBody = '';

    // Choose template and subject based on status
    if (status === 'selected') {
        subject = `Congratulations! Offer for the position of ${position}`;
        emailBody = selectionTemplate.replace('[Candidate Name]', name).replace('[Position]', position);
    } else if (status === 'rejected') {
        subject = `Update on your application for ${position}`;
        emailBody = rejectionTemplate.replace('[Candidate Name]', name).replace('[Position]', position);
    } else {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    // Mail options
    const mailOptions = {
        from: `"HR Team" <${process.env.EMAIL_USER}>`,
        to: email, // Candidate's email
        subject: subject,
        text: emailBody,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email. Please check server logs.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
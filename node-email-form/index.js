const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Don't worry,Server is running!");
});


app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail
            pass: process.env.EMAIL_PASS, // App password
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "swaminathankannank@gmail.com", // Recipient email
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

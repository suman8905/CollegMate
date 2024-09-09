const nodemailer = require('nodemailer');
require('dotenv').config(); 


exports.sendFeedback = async (req, res) => {
     console.log('where is the error 3');
    try {
        const { Name, email, contactNo, Subject, message } = req.body;
        console.log("Feedback... ", req.body);
        // Validate details
        if (!Name || !email || !message || !Subject) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the necessary Details"
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: 'Feedback Form',
            text: `
                Name: ${Name}
                Email: ${email}
                Contact No: ${contactNo}
                Subject: ${Subject}
                Message: ${message}
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Error sending email"
                });
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({
                    success: true,
                    message: "Feedback submitted successfully"
                });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Message wasn't sent. Please try again.",
        });
    }
}

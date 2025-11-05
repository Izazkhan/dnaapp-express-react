// email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify connection (optional, good for startup)
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP ready:', process.env.EMAIL_USER);
    }
});

export async function sendWelcomeEmail(to, name) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Welcome to Our App!',
        html: `
      <h2>Welcome, ${name}!</h2>
      <p>Your account has been successfully created.</p>
      <p><strong>Email:</strong> ${to}</p>
      <hr>
      <small>The Team</small>
    `,
    };

    await transporter.sendMail(mailOptions);
}

export async function sendMail(to, subject, template) {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: template,
    };

    await transporter.sendMail(mailOptions);
}

// Looking to send emails in production? Check out our Email API/SMTP product!
// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "5561abea1a8e57",
//     pass: "e93a297fc0ca3f"
//   }
// });
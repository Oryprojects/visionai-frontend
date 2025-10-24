import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function testEmail() {
  console.log('Attempting to send email with Brevo...');
  console.log('Using Brevo Email:', process.env.BREVO_EMAIL);
  // Do not log the API key for security reasons

  if (!process.env.BREVO_EMAIL || !process.env.BREVO_API_KEY) {
    console.error('Error: BREVO_EMAIL or BREVO_API_KEY not found in .env file.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_EMAIL,
      pass: process.env.BREVO_API_KEY,
    },
  });

  const mailOptions = {
    from: process.env.BREVO_EMAIL, // Sender address
    to: 'test@example.com', // A test recipient
    subject: 'Brevo SMTP Test',
    text: 'This is a test email from your VisionAI application.',
  };

  try {
    await transporter.verify();
    console.log('SUCCESS: Connection to Brevo was successful!');

    let info = await transporter.sendMail(mailOptions);
    console.log('SUCCESS: Test email sent!', info.response);
  } catch (error) {
    console.error('--- TEST FAILED ---');
    console.error(error);
    console.error('-------------------');
    console.log('\nTroubleshooting Tips:');
    console.log('1. Did you generate a new v3 API key from your Brevo account?');
    console.log('2. Is the BREVO_EMAIL in your .env file the exact email you use to log in to Brevo?');
    console.log('3. Did you copy the entire API key correctly, with no extra spaces?');
  }
}

testEmail();

const nodemailer = require('nodemailer');
const Agenda = require('agenda');

const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URI
  }
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Define email sending job
agenda.define('send email', async (job) => {
  const { to, subject, html } = job.attrs.data;
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
});

// Schedule email controller
const scheduleEmail = async (req, res) => {
  try {
    const { time, emailBody, subject, emailAddress } = req.body;
    
    await agenda.schedule(time, 'send email', {
      to: emailAddress,
      subject,
      html: emailBody
    });

    res.json({ message: 'Email scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to schedule email' });
  }
};

// Export the controller using CommonJS syntax
module.exports = { scheduleEmail };

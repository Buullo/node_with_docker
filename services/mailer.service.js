const nodemailer = require("nodemailer");

const smtpOptions = require('../config')['smtpOptions']

async function sendEmail({ from, to, subject, html }) {
  const transporter = nodemailer.createTransport(smtpOptions);

  await transporter.sendMail({ from, to, subject, html });
}

module.exports = sendEmail;
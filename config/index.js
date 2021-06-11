module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  smtpOptions: {
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: false,
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST
  } 
}
import nodeMailer from 'nodemailer';

const sendResetPasswordEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

export default sendResetPasswordEmail;

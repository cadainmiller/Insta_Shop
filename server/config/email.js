const nodemailer = require("nodemailer");

require("dotenv").config();

const SendEmail = (to, subject, body, attachments) => {
  const config = {
    mailserver: {
      host: "smtp.mailtrap.io",
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
    mail: {
      from: "Steve Milburn <no-reply@blog.com>",
      to: to,
      subject: subject,
      html: body,
      attachments: attachments,
    },
  };
  const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver);

    // send mail using transporter
    let info = await transporter.sendMail(mail);

    console.log("Email was sent");
  };

  return sendMail(config).catch(console.error);
};

exports.SendEmail = SendEmail;

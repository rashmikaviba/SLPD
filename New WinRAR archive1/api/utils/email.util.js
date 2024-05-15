import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_PASSWORD,
  },
});

const sendEmail = async (email, subject, htmlBody, attachment) => {
  let mailOptions = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: subject,
    html: htmlBody,
  };

  if (attachment) {
    mailOptions.attachments = [
      {
        filename: attachment.originalname,
        content: attachment.buffer,
        contentType: attachment.mimetype,
      },
    ];
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      return data;
    }
  });
};

//Email Templates
const SendTempPasswordMail = (data) => {
  return `
            <div>
            <h1>Hi ${data.name},</h1>
            <p>Your temporary password is: ${data.password}</p>
            <p>Please change your password after login</p>
            </div>
        `;
};

export default { sendEmail, SendTempPasswordMail };

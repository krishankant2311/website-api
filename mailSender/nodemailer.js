import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.MAIL_HOST,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = async (sub, to, html,attachments = []) => {
  try {
    const mailOptions = {
      from: {
        name: "iraq embassy",
        address: process.env.MAIL_HOST,
      },
      subject: sub,
      to,
      html,
      attachments,
    };

    transport.verify((error, success) => {
      if (error) {
        console.log("❌ Error verifying transport:", error);
      } else {
        console.log("✅ Server is ready to send email");
      }
    });

    const emailSend = await transport.sendMail(mailOptions);
    return emailSend;
  } catch (error) {
    console.log("❌ Error! Cannot send email", error);
    return error;
  }
};

export default sendEmail;

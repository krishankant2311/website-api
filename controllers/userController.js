// controllers/contactController.js
// const sendEmail = require("../mailSender/nodemailer");
import sendEmail from "../mailSender/nodemailer.js";
export const contactUs = async (req, res) => {
  const { fullName, email, phone, message, hospitalDetails,attachmentName } = req.body;

  try {
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Admin email (jahan notification aani hai)
    const adminEmail = "abhinandan@jewarinternational.com";

    const subject = "📩 New Contact Us Inquiry - ARAQ Embassy Website";

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Hospital Details:</strong> ${hospitalDetails || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr/>
      <p>Sent from ARAQ Embassy Website</p>
    `;

    // Agar koi document upload hua hai
    let attachments = [];
    if (req.file) {
      attachments.push({
        filename: attachmentName || req.file.originalname, // ✅ attachment name variable use
        path: req.file.path,
      });
    }
    // Send email with attachment
    const emailSent = await sendEmail(subject, adminEmail, html, attachments);

    res.status(200).json({
      success: true,
      message: "Contact request submitted successfully",
      info: emailSent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send contact form",
      error: error.message,
    });
  }
};

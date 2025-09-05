// controllers/contactController.js
import sendEmail from "../mailSender/nodemailer.js";

export const contactUs = async (req, res) => {
  const { fullName, email, phone, message, hospitalDetails,serviceType,urgency} = req.body;
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  try {
    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Full name, email & message are required",
      });
    }

    const adminEmail = "moh-ind24@moh.gov.iq";
    const subject = "📩 New Contact Us Inquiry - ARAQ Embassy Website";

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Hospital Details:</strong> ${hospitalDetails || "Not provided"}</p>
      <p><strong>Service Type:</strong> ${serviceType || "Not provided"}</p>
      <p><strong>Urgency:</strong> ${urgency || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr/>
      <p>Sent from ARAQ Embassy Website</p>
    `;

    let attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer, // buffer se bhej rahe hain
      });
    }

    const emailSent = await sendEmail(subject, adminEmail, html, attachments);

    res.status(200).json({
      success: true,
      message: "Contact request submitted successfully",
      info: emailSent,
      sentData: {
        fullName,
        email,
        phone,
        hospitalDetails,
        message,
        attachment: req.file
          ? {
              filename: req.file.originalname,
              mimetype: req.file.mimetype,
              size: req.file.size,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("❌ Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send contact form",
      error: error.message,
    });
  }
};

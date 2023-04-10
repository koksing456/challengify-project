// pages/api/send-email.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, html } = req.body;

    try {
      await sgMail.send({
        to,
        from: "koksing456@gmail.com", // Replace this with your own email address
        subject,
        html,
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

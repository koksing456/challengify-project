// pages/api/send-email.js
import sgMail from "@sendgrid/mail";
import { supabase } from "../../lib/supabaseClient";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function getEmailList() {
  try {
    console.log('Fetching email list...');
    const { data, error } = await supabase.from('Email').select('*');

    if (error) {
      throw error;
    }

    console.log('Email list:', data);
    return data;
  } catch (error) {
    console.error('Error fetching email list:', error);
    return null;
  }
}

async function getTodayChallenges() {
  try {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    let { data } = await supabase
      .from("Challenge")
      .select("*")
      .eq("had_displayed", true)
      .eq("display_date", formattedDate)
      .order("id", { ascending: true });

    console.log('Challenge data:', data);

    return data;
  } catch (error) {
    console.error('Error details:', error);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const emailList = await getEmailList();
    const challenges = await getTodayChallenges();

    if (!emailList || !challenges) {
      res.status(500).json({ message: `Error sending email, emailList: ${JSON.stringify(emailList.map((email) => email.email))}, challenges: ${challenges}` });
      return;
    }

    const to = emailList.map((email) => email.email);
    const subject = "Daily Challenge";
    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="font-size: 24px; font-weight: bold; color: #333; text-align: center; padding: 30px 0;">Today's Challenges</h1>
    <ul style="list-style: none; padding: 0;">
      ${challenges
        .map(
          (challenge) => `
          <li style="border-bottom: 1px solid #eee; padding: 20px 0;">
            <div style="font-size: 18px; font-weight: bold; color: #333;">${challenge.description}</div>
          </li>`
        )
        .join('')}
    </ul>
    <div style="text-align: center; padding: 20px 0;">
      <a href="https://challengify.example.com" style="display: inline-block; text-decoration: none; background-color: #1a73e8; color: white; padding: 12px 20px; border-radius: 4px; font-size: 16px;">Visit Challengify</a>
    </div>
  </div>
`;


    try {
      await sgMail.send({
        to,
        from: "koksing456@gmail.com", // Replace this with your own email address
        subject,
        html,
      });
      res.status(200).json({ message: "Email sent successfully", emailList, challenges, to, subject, html });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email, aaa" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

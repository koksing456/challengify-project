// utils/sendEmail.js
export async function sendEmail(to, subject, html) {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, html }),
      });
  
      if (res.status === 200) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email:", await res.json());
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
  
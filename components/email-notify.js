import { useForm } from 'react-hook-form';
import styles from '../styles/EmailNotify.module.css';
import { sendEmail } from "../utils/sendEmail";
import { useState } from 'react';

function EmailNotify ({message}) {
    // Form handling
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Email submitted:', data.email);
        // Call your API to send a notification or store the email address for future notifications
    };

    const [email, setEmail] = useState("");
    const [emailStatus, setEmailStatus] = useState(null);

    const handleEmailNotification = async (e) => {
        e.preventDefault();
      
        if (!email) {
          // Add your validation for empty email
          return;
        }
      
        const subject = "New Challenge Notification";
        const html = `<p>Hello!</p><p>A new challenge is available: ${message}</p><p>Check it out and keep pushing yourself!</p><p>Best,</p><p>Your Challenge App Team</p>`;
      
        try{
            await sendEmail(email, subject, html);
            setEmailStatus("success");
        }catch(error){
            setEmailStatus("error");
        }
        setEmail("");
      };

    return (
        <div className={styles.container}>
            <form onSubmit={handleEmailNotification} className={styles.form}>
                <p className={styles.descriptionText}>
                    Receive daily notifications about new challenges!
                </p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.emailInput}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                <button type="submit" className={styles.notifyButton}>
                    Notify me!
                </button>
                {emailStatus === "success" && (
                    <p className={styles.successMessage}>Email sent successfully!</p>
                )}
                {emailStatus === "error" && (
                    <p className={styles.errorMessage}>Error sending email. Please try again.</p>
                )}
            </form>
        </div>
    )
}

export default EmailNotify

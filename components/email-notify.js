import { useForm } from 'react-hook-form';
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
        <div className="bg-primary-white border-4 border-third rounded-lg p-8 shadow-email-notify mb-8 transform transition duration-300 ease-in-out hover:scale-105">
                <form onSubmit={handleEmailNotification} className="flex flex-col w-full max-w-md mx-auto mt-5">
                    <p className="text-third text-center mb-4">
                    Receive daily notifications about new challenges!
                    </p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white px-4 py-2 mb-4 w-full font-pixel text-sm border-2 border-secondary input-text-third"
                    />
                {errors.email && (
                <p className="text-red-500 text-xs mb-4">{errors.email.message}</p>
                )}
                <button
                type="submit"
                className="bg-email-btn text-third font-pixel text-sm px-8 py-2 rounded w-full transition duration-300 ease-in-out hover:bg-purple-600 hover:text-primary-white animate-bounce"
                >
                Notify me!
                </button>
                {emailStatus === "success" && (
                <p className="text-green-500 text-sm mt-4">
                    Email sent successfully!
                </p>
                )}
                {emailStatus === "error" && (
                <p className="text-red-500 text-sm mt-4">
                    Error sending email. Please try again.
                </p>
                )}
            </form>
        </div>
    )
}

export default EmailNotify

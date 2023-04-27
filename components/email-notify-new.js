import { useState } from 'react';
import { supabase } from './../lib/supabaseClient';

function EmailNotifyNew() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);

        if (!email) {
            setMessage('Please enter a valid email address.');
            setMessageType('error');
            setSubmitting(false);
            return;
        }

        try {
            // Check if email already exists in the table
            const { data: existingEmails, error: fetchError } = await supabase
                .from('Email')
                .select('*')
                .eq('email', email);

            if (fetchError) {
                throw fetchError;
            }

            if (existingEmails && existingEmails.length > 0) {
                setMessage('This email address is already subscribed.');
                setMessageType('error');
            } else {
                const { data, error } = await supabase.from('Email').insert([{ email: email }]);

                if (error) {
                    throw error;
                }

                setEmail('');
                setMessage('Thank you! You\'ll start receiving daily challenge ideas in your inbox.');
                setMessageType('success');
            }
        } catch (error) {
            console.error('Error saving email:', error);
            setMessage('An error occurred while saving the email. Please try again.');
            setMessageType('error');
        } finally {
            setSubmitting(false);
        }
    }

    function clearMessage() {
        setMessage('');
        setMessageType('');
    }

    return (
        <section id="email-notify" className="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24 gap-y-10">
                    <div className="flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-black">Join Challengify Today</h3>
                        <p className="mt-6 text-xl leading-relaxed text-black">Discover AI-generated challenges that motivate personal growth. Connect with a supportive community and work together to achieve your goals.</p>
                    </div>

                    <div>
                        <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                            <div className="p-8 lg:px-12 lg:py-10">
                                <h3 className="text-2xl font-semibold text-black">Start your Challengify journey</h3>
                                <p className="mt-4 text-base text-gray-600">Get daily challenge ideas delivered to your inbox.</p>

                                <form className="mt-8" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 text-base text-gray-700 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex items-center justify-center w-full px-4 py-4 mt-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border-2 border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700"
                                    >
                                        {submitting ? 'Saving...' : 'Get Daily Challenge Ideas'}
                                    </button>
                                </form>

                                {message && (
                                    <div
                                        className={`mt-4 p-3 rounded-md ${messageType === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                                            }`}
                                    >
                                        <p>{message}</p>
                                        <button className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none" onClick={clearMessage}>
                                            &times;
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailNotifyNew;

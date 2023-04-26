function EmailNotifyNew() {
    return (
        <section id="email-notify" className="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24 gap-y-10">
                    <div>
                        <h3 className="text-2xl font-semibold text-black">Why join Challengify?</h3>
                        <p className="mt-6 text-xl leading-relaxed text-black">Challengify offers daily AI-generated challenges that can help you stay motivated and focused on your personal growth. By joining our supportive community, you'll gain access to interesting challenges, connect with like-minded individuals, and work together to achieve your goals.</p>
                    </div>

                    <div>
                        <div className="overflow-hidden bg-white">
                            <div className="p-8 lg:px-12 lg:py-10">
                                <h3 className="text-2xl font-semibold text-black">Join our growing community of challenge enthusiasts</h3>
                                <p className="mt-4 text-base text-gray-600">Get daily challenge ideas directly to your inbox. Start your Challengify journey today!</p>

                                <form className="mt-8">
                                    <input type="email" placeholder="Your email" className="w-full px-4 py-2 text-base text-gray-700 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" />
                                    <button type="submit" className="flex items-center justify-center w-full px-4 py-4 mt-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border-2 border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700">
                                        Get Daily Challenge Ideas
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailNotifyNew;

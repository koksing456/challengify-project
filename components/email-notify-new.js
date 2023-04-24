function EmailNotifyNew() {
    return (
        <section id="email-notify" class="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24 gap-y-10">
                    <div>
                        <img class="object-cover w-16 h-16 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/9/female-avatar-1.png" alt="" />
                        <blockquote>
                            <p class="mt-6 text-xl leading-relaxed text-black">“Since I started using Challengify, I&apos;ve been more motivated and focused on my personal growth. The community is very supportive and the challenges are always interesting.”</p>
                        </blockquote>
                        <p class="mt-6 text-base font-semibold text-black">Jenny Wilson</p>
                        <p class="mt-1 text-base text-gray-600">Project Manager at Microsoft</p>
                    </div>

                    <div>
                        <div class="overflow-hidden bg-white">
                            <div class="p-8 lg:px-12 lg:py-10">
                                <h3 class="text-2xl font-semibold text-black">Join 5,482 other challenge enthusiasts</h3>
                                <p class="mt-4 text-base text-gray-600">Get daily challenge ideas directly to your inbox. Start your Challengify journey today!</p>

                                <form class="mt-8">
                                    <input type="email" placeholder="Your email" class="w-full px-4 py-2 text-base text-gray-700 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-600" />
                                    <button type="submit" class="flex items-center justify-center w-full px-4 py-4 mt-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border-2 border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700">
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

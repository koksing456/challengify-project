import { useState } from 'react';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoSrc, setLogoSrc] = useState(
        'https://img.icons8.com/ios/50/null/super-mario.png'
    );

    const handleMouseEnter = () => {
        setLogoSrc('https://img.icons8.com/doodle/48/null/super-mario.png');
    };

    const handleMouseLeave = () => {
        setLogoSrc('https://img.icons8.com/ios/50/null/super-mario.png');
    };

    return (
        <header className="pb-6 bg-white lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a
                            href="#"
                            title=""
                            className="flex items-center"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={logoSrc}
                                alt="Super Mario Icon"
                                className="w-8 h-8 lg:w-10 lg:h-10 mr-2"
                            />
                            <p className=" text-black font-semibold text-2xl">
                                Challengify
                            </p>
                        </a>
                    </div>

                    <button
                        type="button"
                        className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className={`${menuOpen ? 'hidden' : 'block'} w-6 h-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 8h16M4 16h16"
                            />
                        </svg>

                        <svg
                            className={`${menuOpen ? 'block' : 'hidden'} w-6 h-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div
                        className={`${menuOpen ? 'block' : 'hidden'
                            } lg:flex lg:items-center lg:ml-auto lg:space-x-10`}
                    >
                        <a
                            href="#how-it-works"
                            title=""
                            className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        >
                            How it works
                        </a>

                        <a
                            href="#email-notify"
                            title=""
                            className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        >
                            Notify Me
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;

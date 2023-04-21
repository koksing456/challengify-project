
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const NavBar = () => {
    const { data: session, status } = useSession()

    return (
        <header className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-300 shadow-md">
          <div className="flex items-center">
            <Image
              src="/challengify.png" // replace this with the path to your logo image file
              alt="Challengify Logo"
              width={128} // adjust the width as needed
              height={128} // adjust the height as needed
            />
          </div>
          <h1 className="mb-5 text-white font-pixel">Challengify</h1>
          <nav>
            {status !== "loading" && !session && (
              <button
                className="bg-secondary text-white font-pixel text-sm px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-primary hover:shadow-lg"
                onClick={() => signIn()}
              >
                Log In
              </button>
            )}
            {status !== "loading" && session && (
              <div className='flex items-center'>
                <img
                  src={session.user.image}
                  alt={`Avatar for ${session.user.name}`}
                  className="w-10 h-10 rounded-full object-cover mr-2"
                />
                <span className="text-white font-pixel mr-2 pt-2 px-1">{session.user.name}{' '}</span>
                <button
                  className="bg-secondary text-white font-pixel text-sm px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-primary hover:shadow-lg"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </div>
            )}
          </nav>
        </header>
    );
};

export default NavBar;
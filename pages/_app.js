import '@/styles/globals.css'
import NavBar from '../components/navbar'
import Header from '@/components/header';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <SessionProvider session={session}>
        <div className="bg-gray-900 min-h-screen text-white font-pixel">
          {/* <NavBar /> */}
          <Header />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  )
}

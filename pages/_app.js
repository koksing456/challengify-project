import '@/styles/globals.css'
import NavBar from '../components/navbar'
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}


import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '../styles/NavBar.module.css';
import Image from 'next/image';

const NavBar = () => {
    const { data: session, status } = useSession()

    return (
        <header className={styles.navbar}>
            <div className={styles.logoContainer}>
                <Image
                src="/challengify.png" // replace this with the path to your logo image file
                alt="Challengify Logo"
                width={128} // adjust the width as needed
                height={128} // adjust the height as needed
                />
            </div>
            <h1>Challengify</h1>
            <nav>
                {status !== "loading" && !session && (
                    <button className={styles.navButton} onClick={() => signIn()}>Log In</button>
                )}
                {status !== "loading" && session && (
                <>
                    <img
                    src={session.user.image}
                    alt={`Avatar for ${session.user.name}`}
                    className={styles.userImage}
                    />
                    <span className={styles.span}>{session.user.name}{' '}</span>
                    <button className={styles.navButton} onClick={() => signOut()}>Log Out</button>
                </>
                )}
            </nav>
        </header>
    );
};

export default NavBar;
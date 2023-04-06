
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    const { data: session, status } = useSession()

    return (
        <header className={styles.navbar}>
        <h1>Challengify</h1>
        <nav>
            {status !== "loading" && !session && (
                <button className={styles.navButton} onClick={() => signIn()}>Sign In</button>
            )}
            {status !== "loading" && session && (
            <>
                <span className={styles.span}>{session.user.email}</span>
                <button className={styles.navButton} onClick={() => signOut()}>Sign Out</button>
            </>
            )}
        </nav>
        </header>
    );
};

export default NavBar;
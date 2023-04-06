import styles from '/styles/Challenge.module.css'

function Challenge ({message}) {
    return (
        <div className={styles.challenge}>
            <p className={styles.challengeMessage}>{message}</p>
        </div>
    )
}

export default Challenge
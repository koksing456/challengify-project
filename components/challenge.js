import styles from '/styles/Challenge.module.css'

function Challenge ({message, tags, fetchChallengeByTag}) {
    return (
        <div className={styles.challenge}>
            <p className={styles.challengeMessage}>{message}</p>
            <div className={styles.tags}>
                {tags.map((tag, index) => (
                    <button
                        key={index}
                        className={styles.tag}
                        onClick={() => {
                            fetchChallengeByTag(tag);
                        }}
                        >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Challenge
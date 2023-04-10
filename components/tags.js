import styles from '/styles/Tags.module.css'

function Tags ({message, tags, fetchChallengeByTag}) {
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

export default Tags
function Tags ({tags, fetchChallengeByTag}) {
    return (
        <div>
            {tags.map((tag, index) => (
                <button
                    key={index}
                    className="bg-secondary border-none border-radius-3 text-primary-white cursor-pointer font-pixel text-sm mx-4 my-4 py-0.5 px-1.5"
                    onClick={() => {
                        fetchChallengeByTag(tag);
                    }}
                    >
                    {tag}
                </button>
            ))}
        </div>
    )
}

export default Tags
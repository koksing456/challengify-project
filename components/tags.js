const tagsWithEmoji = [
    "👾#Social Media",
    "⛹️‍♀️#Fitness",
    "⌛#Productivity",
    "🥗#Health",
    "💷#Finance",
    "🎨#Creativity",
];

function Tags({ tags, challenges, fetchChallengeByTag }) {
    return (
        <div>
            {tags.map((tag, index) => (
                <button
                    key={index}
                    className="bg-secondary border-none border-radius-3 text-primary-white cursor-pointer font-pixel text-sm mx-4 my-4 py-0.5 px-1.5"
                    onClick={() => {
                        fetchChallengeByTag(tag, challenges);
                    }}
                >
                    #{tag}
                </button>
            ))}
        </div>
    )
}

export default Tags
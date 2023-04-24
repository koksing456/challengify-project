import React from 'react';

const TwitterShareButton = ({ text, url }) => {
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

  return (
    <a
      href={twitterShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Share on Twitter
    </a>
  );
};

export default TwitterShareButton;
import { Configuration, OpenAIApi } from 'openai';
import Challenge from '../components/challenge';
import EmailNotify from '../components/email-notify';
import styles  from '../styles/Home.module.css';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Tags from '../components/tags';

//out of comfort zone challenge
//send this to the dodomen

function Home ({message}) {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  const router = useRouter();

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const share = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`${message} - Check out this challenge!`);

    let shareURL = '';

    switch (platform) {
      case 'twitter':
        shareURL = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${text}`;
        break;
      case 'whatsapp':
        shareURL = `https://api.whatsapp.com/send?text=${text} ${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareURL, '_blank', 'noopener noreferrer');
  };

  const tags = [
    "⛹️‍♀️#Fitness",
    "⌛#Productivity",
    "🥗#Health",
    "📔#Learning",
    "💷#Finance",
    "👩‍💻#Personal Development",
    "🎨#Creativity",
  ];
  

  const fetchChallengeByTag = (tag, e) => {
    router.push(`/tags/${tag}`);
  };

  return (
    <div className={styles.container}>
      <h1>Challenge of the day!</h1>
      <Challenge message={message}/>
      <Tags tags={tags} fetchChallengeByTag={fetchChallengeByTag}/>
      <button className={styles.button} onClick={toggleModal}>
        Challenge someone
      </button>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={toggleModal}>
              &times;
            </button>
            <h2>Share on:</h2>
            <button className={styles.shareButton} onClick={() => share('twitter')}>
              Twitter
            </button>
            <button className={styles.shareButton} onClick={() => share('facebook')}>
              Facebook
            </button>
            <button className={styles.shareButton} onClick={() => share('whatsapp')}>
              WhatsApp
            </button>
          </div>
        </div>
      )}
      <EmailNotify message={message} />
    </div>
  )
}


//a button to share the challeange to social media
//a button to generate a new challenge
//a button to save the challenge to the database


export default Home

//will need to decide to use getServerProps 
export async function getStaticProps() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Replace this with your actual OpenAI API key
  });

  const openai = new OpenAIApi(configuration);
  let props = {};
  try {
      const promptText = `Generate a challenge idea for today.`;
      //enable below in production, now is to save costs
      // const chatGPTResponse = await openai.createChatCompletion({
      //     model: 'gpt-3.5-turbo',
      //     messages: [
      //         { role: 'user', content: promptText },
      //     ],
      // });
      // const message = chatGPTResponse.data.choices[0].message.content;
      const message = `"30-Day Fitness Challenge": Challenge yourself to exercise for at least 30 minutes every day for the next 30 days. This can include going for a run, doing a yoga class, or even just taking a brisk walk. Keep track of your progress and celebrate each milestone along the way. This challenge will help you establish a regular exercise routine and improve your overall health and wellbeing.`
      props = {message}
  } catch (error) {
      props = {message: 'Error generating challenge'}
      console.error('Error sending prompt to ChatGPT API:', error.message);
      console.error('Error details:', error);
  }

  return { props };
}

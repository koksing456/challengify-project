import { Configuration, OpenAIApi } from 'openai';
import Challenge from '../components/challenge';
import EmailNotify from '../components/email-notify';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Tags from '../components/tags';
import { supabase } from './../lib/supabaseClient';

//out of comfort zone challenge
//send this to the dodomen

function Home ({challenges}) {
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
    const text = encodeURIComponent(`${challenges[0].description} - Check out this challenge!`);

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
    "👾#Social Media",
    "⛹️‍♀️#Fitness",
    "⌛#Productivity",
    "🥗#Health",
    "💷#Finance",
    "🎨#Creativity",
  ];
  

  const fetchChallengeByTag = (tag, e) => {
    router.push(`/tags/${tag}`);
  };

  return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 font-pixel">
      <h1 className="mb-5 text-white">Challenge of the day!</h1>
      <Challenge message={challenges[0].description}/>
      <Tags tags={tags} fetchChallengeByTag={fetchChallengeByTag}/>
      <button className="bg-secondary hover:bg-button-hover transition-colors duration-300 py-2 px-4 text-white font-pixel rounded-none cursor-pointer" onClick={toggleModal}>
        Challenge someone
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white p-5 text-center w-11/12 max-w-md rounded-md relative">
            <button className="bg-transparent text-black font-bold text-2xl cursor-pointer absolute top-1 right-1" onClick={toggleModal}>
              &times;
            </button>
            <h2>Share on:</h2>
            <button className="bg-secondary hover:bg-button-hover transition-colors duration-300 w-full py-2 px-4 text-white font-pixel rounded-none cursor-pointer mb-2" onClick={() => share('twitter')}>
              Twitter
            </button>
            <button className="bg-secondary hover:bg-button-hover transition-colors duration-300 w-full py-2 px-4 text-white font-pixel rounded-none cursor-pointer mb-2" onClick={() => share('facebook')}>
              Facebook
            </button>
            <button className="bg-secondary hover:bg-button-hover transition-colors duration-300 w-full py-2 px-4 text-white font-pixel rounded-none cursor-pointer" onClick={() => share('whatsapp')}>
              WhatsApp
            </button>
          </div>
        </div>
      )}
      <EmailNotify message={challenges[0].description} />
    </div>
  )
}



//a button to share the challeange to social media
//a button to generate a new challenge
//a button to save the challenge to the database


export default Home

async function getChallengeForTag(tag) {
    try {
        let { data } = await supabase
        .from('Challenge')
        .select('*')
        .eq('tag', tag)
        .eq('had_displayed', false)
        .order('id', { ascending: true })
        .limit(1)
        .single();

        // if (data) {
        //     await supabase
        //       .from('Challenge')
        //       .update({ had_displayed: true })
        //       .eq('id', data.id);
        // }

        return data;
    } catch (error) {
        console.error(`Error fetching challenge for tag ${tag}:`, error);
        return null;
    }
}

//will need to decide to use getServerProps 
export async function getServerSideProps() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Replace this with your actual OpenAI API key
  });

  const openai = new OpenAIApi(configuration);
  let props = {};
  let challenges = [];
  const tags = [
    "social meida",
    "fitness",
    "productivity",
    "health",
    "finance",
    "creativity",
  ];
  try {
    //   const promptText = `Generate a challenge idea for today.`;
      //enable below in production, now is to save costs
      // const chatGPTResponse = await openai.createChatCompletion({
      //     model: 'gpt-3.5-turbo',
      //     messages: [
      //         { role: 'user', content: promptText },
      //     ],
      // });
      // const message = chatGPTResponse.data.choices[0].message.content;

      for (const tag of tags) {
        console.log("tag: ", tag);
        const challenge = await getChallengeForTag(tag);
        console.log("challenge: ", challenge);
        if (challenge) {
          challenges.push(challenge);
        }
      }

      console.log("challenges: ", challenges);
      props = {challenges}
  } catch (error) {
      props = {challenges: 'Error generating challenge'}
      console.error('Error sending prompt to ChatGPT API:', error.message);
      console.error('Error details:', error);
  }

  return { props };
}

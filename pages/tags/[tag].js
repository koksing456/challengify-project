import { useRouter } from 'next/router';
import Home from '../index';
import { Configuration, OpenAIApi } from 'openai';
import { useEffect } from 'react';

const TagPage = (props) => {
  return <Home {...props}/>;
};

export default TagPage;

export async function getServerSideProps(context) {
    const { tag } = context.params;
    console.log("Tag in getServerSideProps:", tag);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
  
    const openai = new OpenAIApi(configuration);
    let props = {};
    try {
      const promptText = `Generate a ${tag} challenge idea for today.`;
    //   const chatGPTResponse = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo',
    //     messages: [
    //       { role: 'user', content: promptText },
    //     ],
    //   });
    //   const message = chatGPTResponse.data.choices[0].message.content;
        const message = promptText;
      props = { message };
    } catch (error) {
      props = { message: 'Error generating challenge' };
      console.error('Error sending prompt to ChatGPT API:', error.message);
      console.error('Error details:', error);
    }
  
    return { props };
  }
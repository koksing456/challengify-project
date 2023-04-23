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
    let props = {};
  
    return { props };
}
import { Configuration, OpenAIApi } from 'openai';
import Challenge from '../components/challenge';
import EmailNotify from '../components/email-notify';
import React, { useState } from 'react';
import Tags from '../components/tags';
import { supabase } from './../lib/supabaseClient';
import Guide from '../components/guide';
import Footer from '../components/footer';
import Feedback from '../components/feedback';
import Faq from '@/components/faq';
import EmailNotifyNew from '@/components/email-notify-new';
import ChallengeView from '@/components/challengeView';
import States from '@/components/states';

//out of comfort zone challenge
//send this to the dodomen

function Home({ challenges }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState(challenges[0].description);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const share = (platform) => {
        const url = window.location.href;
        const text = encodeURIComponent(`${selectedChallenge} - Check out this challenge!`);

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

    const shareModal = () => {
        console.log("im here");
        return (<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 flex items-center justify-center">
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
        </div>)

    }

    const tags = [
        "social media",
        "fitness",
        "productivity",
        "health",
        "finance",
        "creativity",
    ];

    const fetchChallengeByTag = (tag, challenges) => {
        const challenge = challenges.find(challenge => challenge.tag === tag);
        if (challenge) {
            setSelectedChallenge(challenge.description);
        }
    };

    return (
        <div className="flex flex-col font-pixel">
            {/* <h1 className="mb-5 text-white">Challenge of the day!</h1> */}
            {/* <Challenge message={selectedChallenge} /> */}
            {/* <Tags tags={tags} challenges={challenges} fetchChallengeByTag={fetchChallengeByTag} /> */}
            {/* <button className="bg-secondary hover:bg-button-hover transition-colors duration-300 py-2 px-4 text-white font-pixel rounded-none cursor-pointer" onClick={toggleModal}>
                Challenge someone
            </button>
            {showModal && shareModal()} */}
            {/* <EmailNotify message={challenges[0].description} /> */}
            <ChallengeView challenges={challenges} />
            <States />
            <Guide />
            {/* <Faq /> */}
            <EmailNotifyNew />
            {/* <Feedback /> */}
            <Footer />
        </div>
    )
}

export default Home

async function getChallengeForTag(tag) {
    try {
        console.log(`Fetching challenge for tag ${tag}...`);

        const today = new Date();
        console.log('Today:', today);
        const dateOnly = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        console.log(dateOnly);
        const dateString = dateOnly.toISOString().split("T")[0];

        console.log('Date only:', dateString);


        let { data } = await supabase
            .from('Challenge')
            .select('*')
            .eq('tag', tag)
            .eq('had_displayed', true)
            .gte('display_date', dateString)
            .lte('display_date', dateString)
            .order('id', { ascending: true })
            .limit(1)
            .single();

        console.log('Challenge data:', data);

        return data;
    } catch (error) {
        console.error(`Error fetching challenge for tag ${tag}:`, error);
        return null;
    }
}

export async function getServerSideProps() {
    let props = {};
    let challenges = [];
    const tags = [
        "social media",
        "fitness",
        "productivity",
        "health",
        "finance",
        "creativity",
    ];
    try {
        for (const tag of tags) {
            const challenge = await getChallengeForTag(tag);
            if (challenge) {
                challenges.push(challenge);
            }
        }

        props = { challenges }
    } catch (error) {
        props = { challenges: 'Error generating challenge' }
        console.error('Error details:', error);
    }

    return { props };
}
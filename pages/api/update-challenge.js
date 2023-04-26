import { supabase } from '../../lib/supabaseClient';

const tags = [
    "social media",
    "fitness",
    "productivity",
    "health",
    "finance",
    "creativity",
];

async function getChallengeForTag(tag) {
    try {
        console.log(`Fetching challenge for tag ${tag}...`);
        let { data } = await supabase
            .from('Challenge')
            .select('*')
            .eq('tag', tag)
            .eq('had_displayed', false)
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

export default async function updateChallenge(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    // Add a secret key to verify the request is coming from the scheduler
    const secretKey = process.env.SCHEDULER_SECRET_KEY;
    if (!secretKey || req.headers['x-scheduler-secret'] !== secretKey) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        for (const tag of tags) {
            const challenge = await getChallengeForTag(tag);
            if (challenge) {
                await supabase
                    .from('Challenge')
                    .update({
                        had_displayed: true,
                        display_date: new Date(),
                    })
                    .eq('id', challenge.id);
            }
        }

        res.status(200).json({ message: 'Challenge updated successfully' });
    } catch (error) {
        console.error('Error updating challenge:', error);
        res.status(500).json({ error: 'Error updating challenge' });
    }
}

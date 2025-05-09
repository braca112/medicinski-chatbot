import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { userMessage } = req.body;
            const groqApiKey = process.env.GROQ_API_KEY;

            const response = await fetch('https://api.groq.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${groqApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-8b-instant',  // Promeni model prema potrebi
                    prompt: userMessage,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            res.status(200).json({ message: data.choices[0].message.content });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

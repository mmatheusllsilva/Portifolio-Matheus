import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const { message } = req.body;
        const apiKey = process.env.GROQ_API_KEY;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { role: "system", content: "Você é o Matheus.AI, assistente do portfólio de Matheus Silva." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'Erro na API da Groq');
        }

        res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ response: "Erro interno: " + error.message });
    }
}

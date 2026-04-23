import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Adiciona headers para evitar problemas de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');

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
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (response.ok && data.choices) {
            return res.status(200).json({ response: data.choices[0].message.content });
        } else {
            console.error("Detalhe do erro Groq:", data);
            return res.status(500).json({ response: "A IA recusou a mensagem. Verifique os logs." });
        }
    } catch (error) {
        return res.status(500).json({ response: "Erro interno: " + error.message });
    }
}

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
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "Você é o Matheus.AI, o assistente virtual do Matheus Silva. Responda sempre em português. Se pedirem contato, informe o e-mail mmatheusllsilva@outlook.com. Fale sobre suas habilidades em n8n e automação." 
                    },
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (response.ok && data.choices) {
            res.status(200).json({ response: data.choices[0].message.content });
        } else {
            res.status(500).json({ response: "Erro na resposta da IA." });
        }
    } catch (error) {
        res.status(500).json({ response: "Erro interno: " + error.message });
    }
}

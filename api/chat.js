import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Garante que só aceita requisições POST
    if (req.method !== 'POST') {
        return res.status(405).json({ response: "Método não permitido" });
    }

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
                    { role: "system", content: "Você é o Matheus.AI, assistente do portfólio de Matheus Silva, especialista em n8n e automação." },
                    { role: "user", content: message || "Olá" } // Fallback caso message venha vazio
                ]
            })
        });

        const data = await response.json();

        // Se a Groq retornar erro (ex: API Key inválida), a gente captura aqui
        if (!response.ok) {
            console.error("Erro da Groq:", data);
            return res.status(response.status).json({ response: "Erro na API: " + (data.error?.message || "Desconhecido") });
        }

        // Verifica se a estrutura esperada existe antes de acessar o [0]
        if (data.choices && data.choices.length > 0) {
            res.status(200).json({ response: data.choices[0].message.content });
        } else {
            res.status(500).json({ response: "Resposta da API em formato inesperado." });
        }

    } catch (error) {
        console.error("Erro no Servidor:", error);
        res.status(500).json({ response: "Erro interno no servidor." });
    }
}

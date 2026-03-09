import Groq from 'groq-sdk';
import { COLLEGE_KNOWLEDGE } from './knowledge.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: "Messages are required and must be an array." });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("Critical: GROQ_API_KEY is not configured.");
            return res.status(500).json({ error: "Server Configuration Error: GROQ_API_KEY is missing." });
        }

        const groq = new Groq({ apiKey });

        const groqMessages = [
            {
                role: "system",
                content: COLLEGE_KNOWLEDGE
            },
            ...messages.map(msg => ({
                role: msg.role === "assistant" ? "assistant" : "user",
                content: msg.content
            }))
        ];

        // Set response headers for streaming
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const stream = await groq.chat.completions.create({
            messages: groqMessages,
            model: "llama-3.3-70b-versatile",
            stream: true,
            temperature: 0.7,
            max_tokens: 2048,
        });

        for await (const chunk of stream) {
            const chunkText = chunk.choices[0]?.delta?.content || "";
            if (chunkText) {
                const openAIFormat = {
                    choices: [{
                        delta: {
                            content: chunkText
                        }
                    }]
                };
                res.write(`data: ${JSON.stringify(openAIFormat)}\n\n`);
            }
        }

        res.write("data: [DONE]\n\n");
        res.end();

    } catch (error) {
        console.error("--- API Error Details ---");
        console.error(error);

        if (!res.headersSent) {
            res.status(500).json({
                error: "AI Service Error",
                details: error.message
            });
        } else {
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted", details: error.message })}\n\n`);
            res.end();
        }
    }
}

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const Groq = require('groq-sdk');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'knowledge.db');
const db = new sqlite3.Database(dbPath);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Helper to get knowledge from DB
const getKnowledge = () => {
    return new Promise((resolve, reject) => {
        db.get("SELECT content FROM knowledge LIMIT 1", (err, row) => {
            if (err) reject(err);
            else resolve(row ? row.content : '');
        });
    });
};

app.post('/api/chat', async (req, res) => {
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

        console.log("--- New Chat Request (Groq/Llama 3) ---");
        console.log("Fetching knowledge from database...");
        const knowledge = await getKnowledge();

        console.log("Preparing messages for Groq...");
        const groqMessages = [
            {
                role: "system",
                content: knowledge
            },
            ...messages.map(msg => ({
                role: msg.role === "assistant" ? "assistant" : "user",
                content: msg.content
            }))
        ];

        console.log(`Sending request to Groq (Llama 3, message count: ${groqMessages.length})`);

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
        console.log("--- Request Completed Successfully ---");

    } catch (error) {
        console.error("--- Chat Error Details ---");
        console.error("Error Name:", error.name);
        console.error("Status Text:", error.statusText);
        console.error("Error Message:", error.message);

        // If the response headers haven't been sent yet, send a 500 error
        if (!res.headersSent) {
            res.status(500).json({
                error: "AI Service Error",
                details: error.message,
                suggestion: "Please check your API key and internet connection."
            });
        } else {
            // If we're already streaming, just end the stream with an error
            res.write(`data: ${JSON.stringify({ error: "Stream interrupted", details: error.message })}\n\n`);
            res.end();
        }
    }
});

app.get('/health', (req, res) => {
    res.json({ status: "ok", message: "Server is reachable" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

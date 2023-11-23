import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

interface ChatRequestBody {
    chats: Chat[];
}

type Chat = {
    role: "system" | "user" | "assistant";
    content: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `You are Yumi a rentals expert. Be friendly and enganing. But if someone asks you questions not related to rentals, say something along the lines of "I can't answer the question as I am not expert at it.". But make sure that the response is still friendly. Also make sure the responses are not too long and are to the point even though frindly.`;

    const requestBody = req.body as ChatRequestBody;

    if (!Array.isArray(requestBody.chats)) {
        res.status(400).json({
            message: "Invalid request format: 'chats' should be an array.",
        });
        return;
    }

    const chats: Chat[] = requestBody.chats.map((chat) => ({
        ...chat,
        content: chat.content,
    }));

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }, ...chats],
            model: "gpt-4",
        });

        const nextChat = completion.choices[0].message as Chat;

        res.status(200).json({ chat: nextChat });
    } catch (_) {
        res.status(500).json({ chat: "" });
    }
};

export default handler;

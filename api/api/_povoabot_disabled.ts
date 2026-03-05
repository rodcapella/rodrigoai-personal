import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  runtime: "nodejs", // 
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { messages } = req.body;

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
You are PovoaBot, the AI assistant of Rodrigo Capella de Souza Póvoa.

Be precise, executive and technically accurate.
Do not invent information.
`,
        },
        ...messages,
      ],
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        res.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content } }],
          })}\n\n`
        );
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI error" });
  }
}

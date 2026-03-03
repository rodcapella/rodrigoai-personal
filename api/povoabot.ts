import OpenAI from "openai";

export const config = {
  runtime: "edge",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: Request) {
  try {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
You are PovoaBot, the AI assistant of Rodrigo Capella de Souza Póvoa.

You answer questions about:
- 15+ years of experience
- Azure Databricks, Delta Lake, PySpark, SQL
- Power BI & governance
- Enterprise architecture
- Leadership and data strategy

Be executive, precise and technically accurate.
Do not invent information.
`,
        },
        ...messages,
      ],
    });

    return new Response(
      JSON.stringify({
        message: completion.choices[0].message,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "OpenAI error" }),
      { status: 500 }
    );
  }
}

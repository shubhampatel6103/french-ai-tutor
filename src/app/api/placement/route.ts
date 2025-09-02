import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { model } from "@/lib/gemini";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { userId, answers } = await req.json();

    if (!userId || !answers) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Ask Gemini to assign difficulty levels
    const prompt = `
You are a French language examiner. The student answered placement test questions. 
Evaluate their French level from 1 (beginner) to 5 (advanced) for each category.
Focus on comprehension for reading/listening, clarity and vocabulary for speaking/writing.

Answers: ${JSON.stringify(answers, null, 2)}

Return JSON strictly in this format:
{
  "reading": 1-5,
  "writing": 1-5,
  "speaking": 1-5,
  "listening": 1-5
}
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Try to parse JSON safely
    let levels;
    try {
      levels = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "AI response invalid", raw: text }, { status: 500 });
    }

    // Save in DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        levelReading: levels.reading,
        levelWriting: levels.writing,
        levelSpeaking: levels.speaking,
        levelListening: levels.listening,
      },
    });

    return NextResponse.json({ message: "Levels updated", levels });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Placement test failed" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json(
      { success: false, message: "اطلاعات وارد شده را بررسی کنید" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You are a language model tasked with writing a complete short story, inspired by a short input provided by the user. The user’s text is not necessarily the beginning of the story—it may be vague, random, or poorly written—but it defines the mood, tone, and style you should follow. You must write the entire story yourself, staying within the same emotional and stylistic space as the user's input. The final output must be between 25 and 250 characters. Use words, phrasing, and rhythm that closely resemble the user's input. Avoid sounding robotic or overly modern. Do not explain anything—just write the story.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: "gpt-4o-mini",
      }),
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return NextResponse.json({
      data: data.choices[0].message.content,
      message: "با موفقیت انجام شد",
      status: 200,
    });
  } catch {
    return NextResponse.json({ success: false, message: "خطا سمت سرور" }, { status: 500 });
  }
}

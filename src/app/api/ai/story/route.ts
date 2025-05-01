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
              "You are a writer. Continue the short story that the user sends you, in a poetic, emotional, and 100% unique way. Your response must be in Persian and human-like, suitable for content marketing and SEO. The total length of the user's original story plus your continuation must be between 50 and 250 characters. Do not include any title, description, headings, keyphrase, or hashtags — just the poetic continuation in Persian. Theme:",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: "gpt-4.1",
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

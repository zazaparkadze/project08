import { NextResponse } from "next/server";
import CreateFeedback from "@/lib/createFeedback";

export function GET(request: Request) {
  const origin = request.headers.get("origin");
  return NextResponse.json(
    { message: "hi there" },
    {
      headers: {
        "Access-Control-Allow-Origin": origin!,
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const data = await request.json();
  const { name, email, phone, textContent } = data;
  const sentData: Feedback = { name, email, phone, textContent };

  await CreateFeedback(sentData);

  for (const prop in sentData) {
    if (prop !== "email") {
      sentData[prop] = sentData[prop].toUpperCase();
    }
  }
  return NextResponse.json(sentData, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin!,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

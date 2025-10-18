import { NextResponse } from "next/server";
import CreateFeedback from "@/lib/createFeedback";

export function GET() {
  return NextResponse.json({ message: "hi there" });
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

export async function POST(request: Request) {
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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

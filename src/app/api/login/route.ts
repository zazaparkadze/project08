import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  return NextResponse.json({
    message: "Logged In",
    user_credentials: { username, password },
  });
}

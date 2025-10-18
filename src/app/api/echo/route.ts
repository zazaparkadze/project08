import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = request.url;

  const newUrl = new URL(url);
  const { searchParams } = newUrl;

  const paramsObject = Object.fromEntries(searchParams.entries());

  const response = NextResponse.json(paramsObject);

  return response;
}

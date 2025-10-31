import Employee from "@/model/Employee";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  connectDB();
  const employees = await Employee.find();
  if (!employees.length) {
    return NextResponse.json({ message: "employees array is empty" });
  }
  return NextResponse.json(employees, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin!,
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

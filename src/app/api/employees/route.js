import Employee from "@/model/Employee";
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET() {
  connectDB();
  const employees = await Employee.find();
  if (!employees.length) {
    return NextResponse.json({ message: "employees array is empty" });
  }
  return NextResponse.json(employees, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

import Employee from "@/model/Employee";
import { NextResponse } from "next/server";
import connectToMongo from "../../../lib/connectToMongo";

export async function GET() {
  connectToMongo();
  const employees = await Employee.find();
  if (!employees.length) {
    return NextResponse.json({ message: "employees array is empty" });
  }
  return NextResponse.json(employees);
}

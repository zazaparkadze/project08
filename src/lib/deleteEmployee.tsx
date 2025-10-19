"use server";
import Employee from "@/model/Employee";
import connectDB from "@/lib/connectDB";

export default async function deleteEmployee(id: number) {
  connectDB();
  const res = await Employee.deleteOne({ id });

  return JSON.stringify(res);
}

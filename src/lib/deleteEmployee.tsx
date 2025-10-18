"use server";
import Employee from "@/model/Employee";
import connectToMongo from "./connectToMongo";

export default async function deleteEmployee(id: number) {
  connectToMongo();
  const res = await Employee.deleteOne({ id });

  return JSON.stringify(res);
}

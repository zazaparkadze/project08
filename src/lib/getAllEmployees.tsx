"use server";
import Employee from "../model/Employee";
import connectDB from "./connectDB";

export default async function getAllEmployees() {
  connectDB();
  const allEmployees: Employee[] = await Employee.find({});

  return JSON.stringify(allEmployees);
}

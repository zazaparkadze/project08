"use server";
import Employee from "@/model/Employee";
import connectDB from "@/lib/connectDB";

export default async function createEmployee(newEmployee: Employee) {
  connectDB();
  const createdEmployee = await Employee.create(newEmployee);

  return JSON.stringify(createdEmployee);
}

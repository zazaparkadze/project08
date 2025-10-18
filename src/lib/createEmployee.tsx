"use server";
import Employee from "@/model/Employee";
import connectToMongo from "./connectToMongo";

export default async function createEmployee(newEmployee: Employee) {
  connectToMongo();
  const createdEmployee = await Employee.create(newEmployee);

  return JSON.stringify(createdEmployee);
}

"use server";
import Employee from "../model/Employee";
import connectToMongo from "./connectToMongo";

export default async function getAllEmployees() {
  connectToMongo();
  const allEmployees: Employee[] = await Employee.find({});

  return JSON.stringify(allEmployees);
}

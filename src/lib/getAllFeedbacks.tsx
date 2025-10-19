"use server";
import Feedback from "../model/Feedback";
import connectDB from "./connectDB";

export default async function getAllFeedbacks() {
  connectDB();
  const allFeedbacks: Feedback[] = await Feedback.find();

  return JSON.stringify(allFeedbacks);
}

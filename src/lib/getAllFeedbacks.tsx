"use server";
import Feedback from "../model/Feedback";
import connectToMongo from "./connectToMongo";

export default async function getAllFeedbacks() {
  connectToMongo();
  const allFeedbacks: Feedback[] = await Feedback.find();

  return JSON.stringify(allFeedbacks);
}

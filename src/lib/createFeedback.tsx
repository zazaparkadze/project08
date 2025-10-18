"use server";
import Feedback from "@/model/Feedback";
import connectToMongo from "./connectToMongo";

export default async function CreateFeedback(feedbackObj: Feedback) {
  connectToMongo();
  const response = await Feedback.create(feedbackObj);

  return JSON.stringify(response);
}

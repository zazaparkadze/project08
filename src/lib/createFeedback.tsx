"use server";
import Feedback from "@/model/Feedback";
import connectDB from "@/lib/connectDB";

export default async function CreateFeedback(feedbackObj: Feedback) {
  connectDB();
  const response = await Feedback.create(feedbackObj);

  return JSON.stringify(response);
}

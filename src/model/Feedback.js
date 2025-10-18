import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  textContent: String,
});

const Feedback =
  mongoose.models?.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default Feedback;

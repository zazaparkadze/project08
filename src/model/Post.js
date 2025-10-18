import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema({
  id: Number,
  title: String,
  dateTime: String,
  postBody: String,
  likes: { type: Number, default: 1 },
  disLikes: { type: Number, default: 0 },
  comments: Array,
  userId: { type: Number, default: 1 },
});

const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema);

export default Post;

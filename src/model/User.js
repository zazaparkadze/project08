import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  roles: {
    type: Object,
    default: {
      user: 2001,
    },
  },
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

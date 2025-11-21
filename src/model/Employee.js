import mongoose from "mongoose";
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  id: Number,
  firstname: String,
  lastname: String,
  email: String,
  status: { type: String, default: "pending" },
  amount: {
    type: Number,
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;

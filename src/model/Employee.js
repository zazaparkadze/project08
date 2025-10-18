import mongoose from "mongoose";
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  id: Number,
  firstname: String,
  lastname: String,
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee;

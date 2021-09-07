import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: String,
  name: String,
  nachname: String,
  email: String
})

const User = mongoose.model("User", userSchema)

export default {
  User
}
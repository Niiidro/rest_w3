import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  nachname: String,
  email: String
})

const user = mongoose.model("User", userSchema)

export default {
  user
}
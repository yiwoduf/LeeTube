import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("User password: ", this.password);
  this.password = await bcrypt.hash(this.password, 3);
  console.log("Hashed: ", this.password);
});

const User = mongoose.model("User", userSchema);
export default User;

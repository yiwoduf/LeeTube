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
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // Array of Video Model Object IDs
});

userSchema.pre("save", async function () {
  console.log("User password: ", this.password);
  // TODO: Add Condition for Hashing Password
  // Now upload video 'saves' user..
  this.password = await bcrypt.hash(this.password, 3);
  console.log("Hashed: ", this.password);
});

const User = mongoose.model("User", userSchema);
export default User;

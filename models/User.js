import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
});

export default mongoose.model("users", userSchema);

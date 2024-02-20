import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
});

UserSchema.methods.toJSON = function () {
	let obj = this.toObject(); //transform to JS object
	delete obj.password;
	return obj;
};
export default mongoose.model("User", UserSchema);

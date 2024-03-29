import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	email: String,
	password: String,
	firstName: String,
	lastName: String,
	projects: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
		},
	],
});

UserSchema.methods.toJSON = function () {
	let obj = this.toObject(); //transform to JS object
	delete obj.password; // dont' want to send password to client
	return obj;
};
export default mongoose.model("User", UserSchema);

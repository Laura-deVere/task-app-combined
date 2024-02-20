import mongoose from "mongoose";
import TaskSchema from "./Task.js";
const Schema = mongoose.Schema;

const projectSchema = new Schema(
	{
		// _id is added automatically
		name: { type: String, required: true },
		tasks: [TaskSchema],
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		// _userId: { type: String, ref: "User", required: false },
	},
	{ timestamps: true }
);
// 4mg per doc in mongoDB
export default mongoose.model("Project", projectSchema);

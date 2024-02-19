import { Schema } from "mongoose";

const taskSchema = new Schema({
	name: { type: String, required: false },
	completed: { type: Boolean, required: true, default: false },
});

export default taskSchema;

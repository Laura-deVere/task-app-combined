import { StatusCodes } from "http-status-codes";

import Project from "../models/Project.js";
import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	const userWithoutPassword = user.toJSON();
	res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
	const obj = { ...req.body };
	delete obj.password;
	const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
	res.status(StatusCodes.OK).json({ message: "update current user." });
};

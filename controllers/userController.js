import { StatusCodes } from "http-status-codes";

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

export const updateUserProjects = async (req, res) => {
	const { id } = req.params;
	console.log("req.body", req.body);
	console.log("id", id);
	const user = await User.findByIdAndUpdate(
		id,
		{ projects: req.body },
		{
			new: true,
		}
	); //by default sends old obj without new true.

	res.status(StatusCodes.OK).json({ message: "Projects updated.", user });
};

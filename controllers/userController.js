import { StatusCodes } from "http-status-codes";

import Project from "../models/Project.js";
import User from "../models/User.js";

export const getCurrentUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId });
	const userWithoutPassword = user.toJSON();
	console.log("getCurrentUser middleware============", req.user);
	res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
	res.status(StatusCodes.OK).json({ message: "update current user." });
};

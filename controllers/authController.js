import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import { hashPassword } from "../utils/passwordUtils.js";

export const register = async (req, res) => {
	req.body.password = await hashPassword(req.body.password); //override the password with the hashed password, never store plain text password

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ message: "User created." });
};

export const login = async (req, res) => {
	res.send("login");
};

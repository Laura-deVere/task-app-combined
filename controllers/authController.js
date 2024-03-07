import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";

import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
	req.body.password = await hashPassword(req.body.password); //override the password with the hashed password, never store plain text password

	const user = await User.create(req.body);
	res.status(StatusCodes.CREATED).json({ message: "User created." });
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	const isValidUser = user && (await comparePassword(password, user.password));
	if (!isValidUser) throw new UnauthenticatedError("Invalid credentials");

	const token = generateToken({ userId: user._id });
	const oneDay = 1000 * 60 * 60 * 24;
	//frontend responsible for storing the token and sending it back with each request
	res.cookie("token", token, {
		httpOnly: true, //cookie cannot be accessed by client javascript
		expire: new Date(Date.now + oneDay), // must be in milliseconds
		secure: process.env.NODE_ENV === "production", //cookie sent over https only
	});
	res.status(StatusCodes.OK).json({ message: "user logged in." });
};

export const logout = async (req, res) => {
	res.cookie("token", "logout", {
		httpOnly: true,
		expires: new Date(Date.now() + 1000), //expire now
	});
	res.status(StatusCodes.OK).json({ message: "user logged out." });
};

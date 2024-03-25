import { body, param, validationResult } from "express-validator";
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from "../errors/customErrors.js";

import mongoose from "mongoose";

import Project from "../models/Project.js";
import User from "../models/User.js";

export const withValidationErrors = (validateValues) => {
	return [
		validateValues, // values to check
		(req, res, next) => {
			console.log(req);
			const errors = validationResult(req); //checks for name in the body of incoming request
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg); //error.message
				if (errorMessages[0].startsWith("project not")) {
					throw new NotFoundError(errorMessages);
				}
				if (errorMessages[0].startsWith("not authorized")) {
					throw new NotFoundError("not authorized to access this route.");
				}
				throw new BadRequestError(`Invalid input: ${errorMessages.join(", ")}`);
			}
			next(); //next passes to the next middleware
		},
	];
};

export const validateProject = withValidationErrors([
	body("name")
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 characters"),
	body("tasks").isArray().withMessage("Tasks must be an array"),
]);

export const validateProjectIdParam = withValidationErrors([
	param("id").custom(async (value, { req }) => {
		const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
		const project = await Project.findById(value);
		if (!project) throw new NotFoundError(`no project with id ${value}`);

		const isOwner = req.user.userId === project.userId.toString();

		if (!isOwner)
			throw new UnauthorizedError("not authorized to access this route");
	}),
]);

export const validateRegister = withValidationErrors([
	// email: String,
	// password: String,
	// firstName: String,
	// lastName: String,
	body("firstName").notEmpty().withMessage("Name is required"),
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format.")
		.custom(async (email) => {
			const user = await User.findOne({ email });
			if (user) throw new BadRequestError("Email already in use.");
		}),
	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters."),
]);

export const validateLogin = withValidationErrors([
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format."),
	body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUser = withValidationErrors([
	body("firstName").notEmpty().withMessage("Name is required"),
	body("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format.")
		.custom(async (email, { req }) => {
			const user = await User.findOne({ email });
			if (user && user._id.toString() !== req.user.userId)
				throw new BadRequestError("Email already in use.");
		}),
]);

export const validateUpdateUserProjects = withValidationErrors([
	body().isArray().withMessage("Projects must be an array"),
]);

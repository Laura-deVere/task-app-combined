import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";

import mongoose from "mongoose";

import Project from "../models/Project.js";
import User from "../models/User.js";

export const withValidationErrors = (validateValues) => {
	return [
		validateValues, // values to check
		(req, res, next) => {
			const errors = validationResult(req); //checks for name in the body of incoming request
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg); //error.message
				if (errorMessages[0].startsWith("project not")) {
					throw new NotFoundError(errorMessages);
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
	body("_userId").isMongoId().withMessage("Invalid user id"),
]);

export const validateProjectIdParam = withValidationErrors([
	param("id")
		.custom(async (value) => {
			const isValid = mongoose.Types.ObjectId.isValid(value);
			if (!isValid) throw new BadRequestError("Invalid mongoDB id.");

			const project = await Project.findById(value);
			if (!project) throw new NotFoundError("project not found");
		})
		.withMessage("Invalid mongoDB id."),
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

import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
	// handle error
	console.error(err);
	//if not statuse code or message
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || "Something went wrong";
	res.status(statusCode).json({ message });
};

export class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.name = "BadRequestError";
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

export class UnauthenticatedError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnauthenticatedError";
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export class UnauthorizedError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnauthorizedError";
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

export default errorHandlerMiddleware;

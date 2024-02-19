import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
	// handle error
	console.error(err);
	//if not statuse code or message
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const message = err.message || "Something went wrong";
	res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;

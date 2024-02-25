import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
	console.log("authenticateUser middleware============", req.cookies);
	const { token } = req.cookies;
	if (!token) throw new UnauthenticatedError("authentication invalid");

	try {
		const { userId } = verifyToken(token);
		req.user = { userId };
		console.log("req.user", req.user);
		next();
	} catch (error) {
		throw new UnauthenticatedError("authentication invalid");
	}
};

export const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		console.log("authorizePermissions middleware============", roles);
		if (!roles.includes(req.user.role))
			throw new UnauthenticatedError("not authorized to access this route.");
		next();
	};
};

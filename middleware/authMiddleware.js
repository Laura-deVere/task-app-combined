import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
	console.log("authenticateUser middleware============", req.cookies);
	const { token } = req.cookies;
	if (!token) throw new UnauthenticatedError("authentication invalid");

	try {
		const { userId } = verifyToken(token);
		req.user = { userId };
		next();
	} catch (error) {
		throw new UnauthenticatedError("authentication invalid");
	}
};

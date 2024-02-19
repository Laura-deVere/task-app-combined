import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10); //default is 10, bigger more secure but longer to hash
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

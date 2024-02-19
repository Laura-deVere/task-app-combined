import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

// Routes
import projectsRouter from "./routes/projectsRouter.js";

// Middleware
import errorHandlerMiddleware from "./middleware/errorHandler.js";

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1", projectsRouter);

app.use("*", (req, res) => {
	// access resource we don't have
	res.status(404).json({ message: "Not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log(`server running on PORT ${port}...`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}

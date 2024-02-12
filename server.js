import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
import morgan from "morgan";

import projectsRouter from "./routes/projectsRouter.js";
import { mongo } from "mongoose";

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/projects", projectsRouter);

app.use("*", (req, res) => {
	// access resource we don't have
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	// handle error
	console.error(err);
	res.status(500).json({ message: "Something went wrong" });
});

const port = process.env.PORT || 5100;

try {
	await mongo.connect(process.env.MONGO_URI);
	app.listen(port, () => {
		console.log(`Server is running on port ${port}...`);
	});
} catch (error) {
	console.error("Error connecting to the database");
	process.exit(1);
}

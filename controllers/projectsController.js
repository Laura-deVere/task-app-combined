import Project from "../models/Project.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req, res) => {
	// const projects = await Project.find({ userId: req.user.userId }); //gets all of project instances
	const user = await User.findOne({ _id: req.user.userId })
		.populate("projects")
		.exec();
	// const projects = user.find().populate("projects");
	res.status(StatusCodes.OK).json({ projects: user.projects });
};

export const createProject = async (req, res) => {
	const { name, tasks } = req.body;
	const { userId } = req.user;
	const project = await Project.create({ name, tasks, userId });
	const user = await User.findOne({ _id: req.user.userId });
	console.log("user.projects--------------------------", user.projects);
	const userProjectIds = user.projects.map((id) => id);
	userProjectIds.unshift(project._id);
	console.log("userProjectIds--------------------------", userProjectIds);
	await user.updateOne({ projects: userProjectIds });
	res.status(StatusCodes.CREATED).json({ project });
};

export const updateProject = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findByIdAndUpdate(id, req.body, {
		new: true,
	}); //by default sends old obj without new true.

	res.status(StatusCodes.OK).json({ message: "Project updated.", project });
};

export const deleteProject = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findByIdAndDelete(id);

	res.status(StatusCodes.OK).json({ message: "Project deleted", project });
};

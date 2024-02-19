import Project from "../models/Project.js";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req, res) => {
	const projects = await Project.find(); //gets all of project instances
	res.status(StatusCodes.OK).json({ projects });
};

export const createProject = async (req, res) => {
	const { name, tasks, _userId } = req.body;
	const project = await Project.create({ name, tasks, _userId });
	res.status(StatusCodes.CREATED).json({ project });
};

export const updateProject = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findByIdAndUpdate(id, req.body, {
		new: true,
	}); //by delete sends old obj without new true.

	res.status(StatusCodes.OK).json({ message: "Project updated.", project });
};

export const deleteProject = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findByIdAndDelete(id);

	res.status(StatusCodes.OK).json({ message: "Project deleted", project });
};

import { Router } from "express";

const router = Router();

import {
	getAllProjects,
	createProject,
	updateProject,
	deleteProject,
} from "../controllers/projectsController.js";

router.get("/", getAllProjects);

router.post("/", createProject);

router.patch("/:id", updateProject);

router.delete("/:id", deleteProject);

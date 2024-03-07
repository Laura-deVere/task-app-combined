import { Router } from "express";

const router = Router();

import {
	getAllProjects,
	createProject,
	updateProject,
	deleteProject,
} from "../controllers/projectsController.js";
import {
	validateProject,
	validateProjectIdParam,
} from "../middleware/validationMiddleware.js";

router.get("/projects", getAllProjects);

router.post("/project", createProject);

router.patch(
	"/project/:id",
	validateProject,
	validateProjectIdParam,
	updateProject
);

router.delete("/project/:id", validateProjectIdParam, deleteProject);

export default router;

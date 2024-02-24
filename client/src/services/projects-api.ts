// const APP_SERVER_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

import { Project } from "../types";

class ProjectsApi {
	createProject(project: Project) {
		console.log("body project", project);
		return fetch(`http://localhost:5050/api/project`, {
			method: "POST",
			body: JSON.stringify(project),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}

	deleteProject(projectId: string) {
		return fetch(`http://localhost:5050/api/project/${projectId}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}

	editProject(project: Project) {
		return fetch(`/api/project/${project._id}`, {
			method: "PUT",
			body: JSON.stringify(project),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}
}

export default new ProjectsApi();

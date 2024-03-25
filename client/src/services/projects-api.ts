import { Project } from "../types";
import customFetch from "../utils/customFetch";

class ProjectsApi {
	getProjects() {
		return customFetch
			.get("/projects")
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}

	createProject(project: Project) {
		return customFetch
			.post(`/project`, project)
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}

	deleteProject(projectId: string) {
		return customFetch
			.delete(`/project/${projectId}`)
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}

	editProject(project: Project) {
		return customFetch
			.patch(`/project/${project._id}`, project)
			.then((data) => data)
			.catch((err) => {
				console.error(err);
				return err;
			});
	}

	updateProjects(projectIds: string[]) {
		return customFetch
			.post(`/users/update-user/projects`, projectIds)
			.then((data) => {
				console.log(data);
				return data;
			})
			.catch((err) => {
				console.error(err);
				return err;
			});
	}
}

export default new ProjectsApi();

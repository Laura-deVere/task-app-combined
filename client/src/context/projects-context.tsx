import React, { createContext, useReducer, useEffect } from "react";

import { Project, ProjectsArray } from "../types";
import ProjectsApi from "../services/projects-api";

const ProjectsContext = createContext<any>(null);

enum ACTIONS {
	GET_PROJECTS = "GET_PROJECTS",
	CREATE_PROJECT = "CREATE_PROJECT",
	DELETE_PROJECT = "DELETE_PROJECT",
	EDIT_PROJECT = "EDIT_PROJECT",
}

interface ProjectsAction {
	type: ACTIONS;
	payload: any;
}

interface ProjectsState {
	projects: ProjectsArray | [];
	loading: boolean;
	error: boolean;
}

const initialState: ProjectsState = {
	projects: [],
	loading: false,
	error: false,
};

function projectsReducer(state = initialState, action: ProjectsAction) {
	const { type, payload } = action;
	switch (type) {
		case ACTIONS.GET_PROJECTS: {
			return {
				...state,
				projects: action.payload,
			};
		}
		case ACTIONS.CREATE_PROJECT: {
			return {
				...state,
				projects: [...state.projects, payload],
			};
		}
		case ACTIONS.DELETE_PROJECT: {
			return {
				...state,
				projects: state.projects.filter(
					(project: Project) => project._id !== payload
				),
			};
		}
		case ACTIONS.EDIT_PROJECT: {
			return {
				...state,
				projects: state.projects.map((project: Project) => {
					if (project._id === payload._id) {
						return { ...payload };
					} else {
						return project;
					}
				}),
			};
		}
		default:
			return state;
	}
}

const ProjectsProvider: React.FC<{ children: any; isLoggedIn: boolean }> = ({
	children,
	isLoggedIn,
}) => {
	const [state, dispatch] = useReducer(projectsReducer, initialState);

	useEffect(() => {
		if (isLoggedIn) {
			fetch(`/api/projects`, {
				method: "GET",
			})
				.then((res) => res.json())
				.then((data) => dispatch({ type: ACTIONS.GET_PROJECTS, payload: data }))
				.catch((err) => {
					console.error(err);
				});
		}
	}, [isLoggedIn]);

	const createProject = async (project: Project) => {
		console.log("createProject", project);
		try {
			const newProject = await ProjectsApi.createProject(project);
			dispatch({ type: ACTIONS.CREATE_PROJECT, payload: newProject });
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProject = async (projectId: string) => {
		try {
			await ProjectsApi.deleteProject(projectId);
			dispatch({ type: ACTIONS.DELETE_PROJECT, payload: projectId });
		} catch (error) {
			console.log(error);
		}
	};

	const updateProject = async (project: Project) => {
		try {
			const updatedProject = await ProjectsApi.editProject(project);
			dispatch({ type: ACTIONS.EDIT_PROJECT, payload: updatedProject });
		} catch (error) {
			console.log(error);
		}
	};

	const setProjects = (newProjectsArray: ProjectsArray) => {
		console.log("setProjects", newProjectsArray);
		dispatch({ type: ACTIONS.GET_PROJECTS, payload: newProjectsArray });
	};

	const value = {
		projects: state.projects,
		createProject,
		deleteProject,
		updateProject,
		setProjects,
	};

	return (
		<ProjectsContext.Provider value={value}>
			{children}
		</ProjectsContext.Provider>
	);
};

export { ProjectsContext, ProjectsProvider };

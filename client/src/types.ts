export interface TaskType {
	_id: string;
	name: string;
	completed: boolean;
}

export interface Project {
	name: string;
	_id: string;
	tasks: TaskType[] | [];
}

export type ProjectsArray = Project[];

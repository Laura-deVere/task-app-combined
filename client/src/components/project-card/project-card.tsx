import {
	useMemo,
	useState,
	useContext,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { isEqual, cloneDeep } from "lodash";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Project, TaskType } from "../../types";
import { ProjectsContext } from "../../context/projects-context";

import MoreMenu from "../more-menu/more-menu";
import Task from "../task/task";

import "./project-card.scss";

const className = "project-card";
const classNamePrefix = `${className}__`;

const ProjectCard: React.FC<{
	project: Project;
	name: string;
	tasks: any;
	_id: string;
	index: number;
}> = ({ project, index, name, tasks, _id }) => {
	const [localProject, setLocalProject] = useState(cloneDeep(project));
	const { deleteProject, updateProject } = useContext(ProjectsContext);

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: _id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	useEffect(() => {
		if (isEqual(localProject, project)) return;
		setLocalProject(cloneDeep(project));
	}, [project]);

	const menuItems = useMemo(() => {
		return [
			{
				name: "Delete",
				onClick: () => {
					deleteProject(localProject._id);
				},
			},
		];
	}, [localProject, deleteProject]);

	const handleDeleteTask = useCallback(
		(taskId: string | undefined) => {
			const newTasks = localProject.tasks.filter((task) => task._id !== taskId);
			const newProject = { ...localProject, tasks: newTasks };
			updateProject(newProject);
		},
		[localProject]
	);

	const handleNewTask = useCallback(() => {
		const newTasks = localProject.tasks.map((task) => Object.assign(task, {}));
		newTasks.push({ name: "", completed: false });
		const newProject = { ...localProject, tasks: newTasks };
		updateProject(newProject);
	}, [localProject]);

	const handleUpdateProject = useCallback(
		(taskId: string | undefined, name: string, completed: boolean) => {
			const copyTasks = localProject?.tasks.map((task) => {
				if (task._id === taskId) {
					task.name = name;
					task.completed = completed;
				}
				return task;
			});
			const newProject = { ...localProject, tasks: copyTasks };
			if (isEqual(newProject, project)) return;
			updateProject(newProject);
		},
		[localProject]
	);

	return (
		<li
			className={className}
			id={_id}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			<div className={`${classNamePrefix}container`}>
				<h3>
					{name} -{index}
				</h3>
				<div className={`${classNamePrefix}tasks`}>
					<ul>
						{tasks.map((task: TaskType) => {
							const { _id, name, completed } = task;
							return (
								<Task
									key={_id}
									id={_id}
									name={name}
									completed={completed}
									onChange={handleUpdateProject}
									onDelete={handleDeleteTask}
								/>
							);
						})}
					</ul>
				</div>
				<footer className={`${classNamePrefix}footer`}>
					<button
						type='button'
						className={`${classNamePrefix}new-task`}
						onClick={handleNewTask}
					>
						<IonIcon color='light' icon={addOutline} />
					</button>
					<MoreMenu items={menuItems} />
				</footer>
			</div>
		</li>
	);
};
export default ProjectCard;

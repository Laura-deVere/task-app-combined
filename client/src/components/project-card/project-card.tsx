import {
	useMemo,
	useState,
	useContext,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { IonIcon } from "@ionic/react";
import { isEqual } from "lodash";
import { useDrag, useDrop } from "react-dnd";

import { Project, TaskType } from "../../types";
import { ProjectsContext } from "../../context/projects-context";

import MoreMenu from "../more-menu/more-menu";
import Task from "../task/task";

import "./project-card.scss";

const className = "project-card";
const classNamePrefix = `${className}__`;

const DRAG_TYPE = "project";

const ProjectCard: React.FC<{
	project: Project;
	name: string;
	tasks: any;
	_id: string;
	moveProject: (dragIndex: number, hoverIndex: number) => void;
	index: number;
}> = ({ project, moveProject, index, name, tasks, _id }) => {
	const ref = useRef<HTMLLIElement>(null);

	const [localProject, setLocalProject] = useState(Object.assign(project, {}));
	const { deleteProject, updateProject } = useContext(ProjectsContext);

	const [{ handlerId }, drop] = useDrop({
		accept: DRAG_TYPE,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: any, monitor): void {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverMiddleX =
				(hoverBoundingRect.right - hoverBoundingRect.left) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
			const hoverClientX = clientOffset!.x - hoverBoundingRect.right;

			// Only perform the move when the mouse has crossed half of the items height or width
			// When dragging downwards or right to left, only move when the cursor is below 50%
			if (
				dragIndex < hoverIndex &&
				hoverClientY < hoverMiddleY &&
				hoverClientX < hoverMiddleX
			) {
				return;
			}

			// When dragging upwards or left to right, only move when the cursor is above 50%
			if (
				dragIndex > hoverIndex &&
				hoverClientY > hoverMiddleY &&
				hoverClientX > hoverMiddleX
			) {
				return;
			}

			// Determine rectangle on screen
			// const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// // Get vertical middle
			// const hoverMiddleY =
			// 	(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// // Determine mouse position
			// const clientOffset = monitor.getClientOffset();
			// // Get pixels to the top
			// const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			// 	return;
			// }
			// // Dragging upwards
			// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			// 	return;
			// }
			// Time to actually perform the action
			moveProject(dragIndex, hoverIndex);
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: "card",
		item: () => {
			return { id: _id, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	// const tasks = useMemo(() => {
	// 	if (!localProject) return [];
	// 	return localProject.tasks;
	// }, [localProject]);

	const projectRef = useRef<Project | null>(null);

	useEffect(() => {
		projectRef.current = { ...localProject };
	}, [localProject]);

	function handleUpdateProject(
		taskId: string,
		name: string,
		completed: boolean
	) {
		const copyTasks = projectRef.current?.tasks.map((task) => {
			if (task._id === taskId) {
				task.name = name;
				task.completed = completed;
			}
			return task;
		});
		const newProject = { ...localProject, tasks: copyTasks };

		updateProject(newProject);
	}

	useEffect(() => {
		if (isEqual(localProject, project)) return;
		setLocalProject(Object.assign(project, {}));
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
		(taskId: string) => {
			const newTasks = localProject.tasks.filter((task) => task._id !== taskId);
			const newProject = { ...localProject, tasks: newTasks };
			updateProject(newProject);
		},
		[localProject]
	);

	const handleNewTask = useCallback(() => {
		const newTasks = [...localProject.tasks, { name: "", completed: false }];
		const newProject = { ...localProject, tasks: newTasks };
		updateProject(newProject);
	}, [localProject]);

	// const opacity = isDragging ? 0 : 1;
	// drag(drop(ref));

	return (
		<li
			className={className}
			ref={ref}
			style={{ opacity }}
			data-handler-id={handlerId}
		>
			<div className={`${classNamePrefix}container`}>
				<h3>
					{name} - {index}
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
						<IonIcon color='light' icon={"add-outline"} />
					</button>
					<MoreMenu items={menuItems} />
				</footer>
			</div>
		</li>
	);
};
export default ProjectCard;

// import { useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";
// // import { ItemTypes } from "./ItemTypes.js";

// const style = {
// 	border: "1px dashed gray",
// 	padding: "0.5rem 1rem",
// 	marginBottom: ".5rem",
// 	backgroundColor: "white",
// 	cursor: "move",
// };
// export const Card = ({ id, text, index, moveCard }) => {
// 	const ref = useRef(null);
// 	const [{ handlerId }, drop] = useDrop({
// 		accept: "card",
// 		collect(monitor) {
// 			return {
// 				handlerId: monitor.getHandlerId(),
// 			};
// 		},
// 		hover(item, monitor) {
// 			if (!ref.current) {
// 				return;
// 			}
// 			const dragIndex = item.index;
// 			const hoverIndex = index;
// 			// Don't replace items with themselves
// 			if (dragIndex === hoverIndex) {
// 				return;
// 			}
// 			// Determine rectangle on screen
// 			const hoverBoundingRect = ref.current?.getBoundingClientRect();
// 			// Get vertical middle
// 			const hoverMiddleY =
// 				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
// 			// Determine mouse position
// 			const clientOffset = monitor.getClientOffset();
// 			// Get pixels to the top
// 			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
// 			// Only perform the move when the mouse has crossed half of the items height
// 			// When dragging downwards, only move when the cursor is below 50%
// 			// When dragging upwards, only move when the cursor is above 50%
// 			// Dragging downwards
// 			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
// 				return;
// 			}
// 			// Dragging upwards
// 			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
// 				return;
// 			}
// 			// Time to actually perform the action
// 			moveCard(dragIndex, hoverIndex);
// 			// Note: we're mutating the monitor item here!
// 			// Generally it's better to avoid mutations,
// 			// but it's good here for the sake of performance
// 			// to avoid expensive index searches.
// 			item.index = hoverIndex;
// 		},
// 	});
// 	const [{ isDragging }, drag] = useDrag({
// 		type: "card",
// 		item: () => {
// 			return { id, index };
// 		},
// 		collect: (monitor) => ({
// 			isDragging: monitor.isDragging(),
// 		}),
// 	});
// 	const opacity = isDragging ? 0 : 1;
// 	drag(drop(ref));
// 	return (
// 		<div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
// 			{text}
// 		</div>
// 	);
// };

// export default Card;

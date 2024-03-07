import { useState, useContext } from "react";
import nextId from "react-id-generator";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

import { ProjectsContext } from "../../context/projects-context";

import Button from "../button/button";
import Task from "../task/task";

import "./new-project.scss";

const className = "new-project";
const classNamePrefix = `${className}__`;

const baseTaskId = "tsk";

const NewProject: React.FC = () => {
	const { createProject } = useContext(ProjectsContext);

	const [stateName, setStateName] = useState("");
	const [tasks, setTasks] = useState([
		{ id: nextId(baseTaskId), name: "", completed: false },
	]);

	const handleAddProject = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		createProject({ name: stateName, tasks: tasks });
		handleReset();
	};

	const handleReset = () => {
		setStateName("");
		setTasks([{ id: nextId(baseTaskId), name: "", completed: false }]);
	};

	const addTask = () => {
		setTasks((prevTasks) => {
			return [
				...prevTasks,
				{ id: nextId(baseTaskId), name: "", completed: false },
			];
		});
	};

	const handleTaskChange = (
		id: string | undefined,
		name: string,
		completed: boolean
	) => {
		setTasks((prevTasks) => {
			const taskIndex = prevTasks.findIndex((task) => task.id === id);
			const newTask = { ...prevTasks[taskIndex], name, completed };
			const newTasks = [...prevTasks];
			newTasks[taskIndex] = newTask;
			return newTasks;
		});
	};

	const handleDeleteTask = (taskId: string | undefined) => {
		setTasks((prevTasks) => {
			return prevTasks.filter((task) => task.id !== taskId);
		});
	};

	return (
		<div className={className}>
			<form onSubmit={handleAddProject}>
				<input
					type='text'
					value={stateName}
					onChange={(evt) => setStateName(evt.target.value)}
					placeholder='Project Name...'
				/>
				<div className={`${classNamePrefix}tasks`}>
					<ul>
						{tasks.map((task) => {
							const { id, name, completed } = task;
							return (
								<Task
									key={id}
									id={id}
									name={name}
									completed={completed}
									onChange={handleTaskChange}
									onDelete={handleDeleteTask}
								/>
							);
						})}
					</ul>
				</div>

				<div className={`${classNamePrefix}action-btns`}>
					<button type='button' className='add-task' onClick={addTask}>
						<IonIcon color='light' icon={addOutline} />
					</button>
					<Button
						display='primary'
						type='submit'
						disabled={!stateName}
						text='Save'
					/>
				</div>
			</form>
		</div>
	);
};

export default NewProject;

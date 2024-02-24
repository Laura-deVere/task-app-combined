import { useCallback, useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";

import Checkbox from "../checkbox/checkbox";
import useDebounce from "../../hooks/useDebounce";

import "./task.scss";

const className = "task";
const classNamePrefix = `${className}__`;

const Task: React.FC<{
	id: string;
	name: string;
	completed: boolean;
	onChange: (id: string, value: string, completed: boolean) => void;
	onDelete: (id: string) => void;
}> = ({ id, name, completed, onChange, onDelete }) => {
	const [localName, setLocalName] = useState(name);
	const [localCompleted, setLocalCompleted] = useState(completed);

	const { debouncedCallback } = useDebounce();

	const debounceUpdateProject = useCallback(
		debouncedCallback(() => {
			onChange(id, localName, localCompleted);
		}, 500),
		[]
	);

	useEffect(() => {
		if (localName === name && localCompleted === completed) return;
		debounceUpdateProject(id, localName, localCompleted);
	}, [localName, localCompleted]);

	const onNameChangeHandler = (value: string) => {
		setLocalName(value);
	};

	const onCompletedChangeHandler = (value: boolean) => {
		setLocalCompleted(value);
	};

	return (
		<li className={className}>
			<Checkbox
				checked={localCompleted}
				handleOnChange={(evt, checked) => {
					evt.preventDefault();
					onCompletedChangeHandler(checked);
				}}
				id={id}
				label={name}
			/>
			<div className={`${classNamePrefix}input-wrapper`}>
				<label className='sr-only'>Task Name</label>
				<input
					type='text'
					value={localName}
					onChange={(evt) => onNameChangeHandler(evt.target.value)}
					placeholder='Task Name...'
				/>
				<button
					className={`${classNamePrefix}btn-delete`}
					type='button'
					onClick={() => {
						onDelete(id);
					}}
				>
					<IonIcon color='light' icon={"trash-outline"} />
				</button>
			</div>
		</li>
	);
};

export default Task;

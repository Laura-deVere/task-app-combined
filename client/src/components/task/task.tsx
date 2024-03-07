import { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

import Checkbox from "../checkbox/checkbox";
import { useDebouncedValue } from "../../hooks/useDouncedValue";

import "./task.scss";

const className = "task";
const classNamePrefix = `${className}__`;

const Task: React.FC<{
	id: string | undefined;
	name: string;
	completed: boolean;
	onChange: (id: string | undefined, value: string, completed: boolean) => void;
	onDelete: (id: string | undefined) => void;
}> = ({ id, name, completed, onChange, onDelete }) => {
	const [localName, setLocalName] = useState(name);
	const [localCompleted, setLocalCompleted] = useState(completed);

	const debouncedName = useDebouncedValue(name, localName, 500);

	useEffect(() => {
		if (debouncedName === name && localCompleted === completed) return;
		onChange(id, debouncedName, localCompleted);
	}, [debouncedName, localCompleted]);

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
				id={id ?? name}
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
					<IonIcon color='light' icon={trashOutline} />
				</button>
			</div>
		</li>
	);
};

export default Task;

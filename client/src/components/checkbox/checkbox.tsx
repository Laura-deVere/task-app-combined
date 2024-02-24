import "./checkbox.scss";

const className = "checkbox-wrapper";
const classNamePrefix = `${className}__`;

const Checkbox: React.FC<{
	id: string;
	label: string;
	checked: boolean;
	handleOnChange: (
		evt: React.FormEvent<HTMLInputElement>,
		checked: boolean
	) => void;
}> = ({ id, label, checked, handleOnChange, ...props }) => {
	return (
		<div className={className}>
			<label className='sr-only' htmlFor={id}>
				{label}
			</label>
			<input
				id={id}
				type='checkbox'
				className={checked ? `${classNamePrefix}checked` : ""}
				defaultChecked={checked}
				onClick={(evt) => {
					evt.preventDefault();
					handleOnChange(evt, !checked);
				}}
				{...props}
			/>
		</div>
	);
};

export default Checkbox;

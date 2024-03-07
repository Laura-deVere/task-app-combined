import "./form-row.scss";

const className = "form-row";
const classNamePrefix = `${className}__`;

const FormRow: React.FC<{
	type: string;
	name: string;
	labelText: string;
	defaultValue: string | number;
}> = ({ type, name, labelText, defaultValue }) => {
	return (
		<div className={className}>
			<label className={`${classNamePrefix}label`} htmlFor={name}>
				{labelText || name}
			</label>
			<input
				className={`${classNamePrefix}input`}
				type={type}
				id={name}
				name={name}
				defaultValue={defaultValue}
				required
			/>
		</div>
	);
};

export default FormRow;

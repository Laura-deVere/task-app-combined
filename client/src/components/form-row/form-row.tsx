import "./form-row.scss";

const FormRow: React.FC<{
	type: string;
	name: string;
	labelText: string;
	defaultValue: string | number;
}> = ({ type, name, labelText, defaultValue }) => {
	return (
		<div className='form-row'>
			<label htmlFor={name}>{labelText || name}</label>
			<input
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

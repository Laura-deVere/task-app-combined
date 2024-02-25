import { Link } from "react-router-dom";

import FormRow from "../components/form-row/form-row";

const Register = () => {
	return (
		<div>
			<form>
				<h1>Register</h1>
				<FormRow
					type='text'
					name='firstName'
					labelText='First name'
					defaultValue='Jane'
				/>
				<FormRow
					type='text'
					name='lastName'
					labelText='Last name'
					defaultValue='Doe'
				/>
				<FormRow
					type='email'
					name='email'
					labelText='Email'
					defaultValue='jane@jane.com'
				/>
				<FormRow
					type='password'
					name='password'
					labelText='Password'
					defaultValue='pw123456'
				/>
				<button type='submit'>Register</button>
			</form>
			<p>
				Already registered? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};

export default Register;

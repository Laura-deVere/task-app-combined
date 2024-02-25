import { Link, Form, redirect, useNavigation } from "react-router-dom";

import { toast } from "react-toastify";

import FormRow from "../components/form-row/form-row";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await customFetch.post("/auth/register", data);
		toast.success("Registered successfully");
		return redirect("/login");
	} catch (error) {
		// toast.error(error?.response?.data?.message);
		toast.error("Registration failed.");
		return error;
	}
};
const Register: React.FC<{}> = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<section>
			<Form method='post' className='form'>
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
				<button type='submit' disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			</Form>
			<p>
				Already registered? <Link to='/login'>Login</Link>
			</p>
		</section>
	);
};

export default Register;

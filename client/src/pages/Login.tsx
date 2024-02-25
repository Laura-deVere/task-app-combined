import { Link, Form, redirect, useNavigation } from "react-router-dom";

import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import FormRow from "../components/form-row/form-row";

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	try {
		await customFetch.post("/auth/login", data);
		toast.success("Login successful");
		return redirect("/projects");
	} catch (error) {
		// toast.error(error?.response?.data?.message);
		toast.error("Login failed.");
		return error;
	}
};

const Login: React.FC<{}> = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<section id='pageLogin'>
			<Form method='post'>
				<h1>Login</h1>
				<FormRow
					type='text'
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
					{isSubmitting ? "Submitting..." : "Login"}
				</button>
				<p>
					Not registered? <Link to='/register'>Sign up</Link>
				</p>
			</Form>
		</section>
	);
};

export default Login;

import { Link, Form, redirect, useNavigation } from "react-router-dom";

import { toast } from "react-toastify";

import FormRow from "../components/form-row/form-row";
import Button from "../components/button/button";

import customFetch from "../utils/customFetch";

import "./register-form.scss";

const className = "register-form";
const classNamePrefix = `${className}__`;

export const action = async ({ request }: any) => {
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

const Register: React.FC = () => {
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";
	return (
		<section className={className}>
			<Form method='post' className='form'>
				<h1 className={`${classNamePrefix}header`}>Register</h1>
				<FormRow type='text' name='firstName' labelText='First name' />
				<FormRow type='text' name='lastName' labelText='Last name' />
				<FormRow type='email' name='email' labelText='Email' />
				<FormRow type='password' name='password' labelText='Password' />
				<div className={`${classNamePrefix}btn-row`}>
					<Button
						type='submit'
						display='primary'
						text={isSubmitting ? "Submitting..." : "Submit"}
						disabled={isSubmitting}
					/>
				</div>
			</Form>
			<footer>
				<p>
					Already registered? <Link to='/login'>Login</Link>
				</p>
			</footer>
		</section>
	);
};

export default Register;

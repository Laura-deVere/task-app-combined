import { useContext, useState } from "react";
import { Link, Form, Navigate } from "react-router-dom";

import { CurrentUserContext } from "../context/current-user-context";

import Button from "../components/button/button";
import FormRow from "../components/form-row/form-row";

import "./register-form.scss";

const className = "register-form";
const classNamePrefix = `${className}__`;

const Login = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { user, handleSignIn } = useContext(CurrentUserContext);

	const handleSubmit = async (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		setIsSubmitting(true);
		const target = evt.target as typeof evt.target & {
			email: { value: string };
			password: { value: string };
		};
		const data = { email: target.email.value, password: target.password.value };
		await handleSignIn(data);
		setIsSubmitting(false);
	};

	return (
		<section id='pageLogin' className={className}>
			{user && <Navigate to='/projects' />}
			<Form onSubmit={handleSubmit}>
				<h1 className={`${classNamePrefix}header`}>Login</h1>
				<FormRow type='email' name='email' labelText='Email' />
				<FormRow type='password' name='password' labelText='Password' />
				<div className={`${classNamePrefix}btn-row`}>
					<Button
						type='submit'
						display='primary'
						text={isSubmitting ? "Submitting..." : "Login"}
						disabled={isSubmitting}
					/>
				</div>
				<footer>
					<p>
						Not registered? <Link to='/register'>Sign up</Link>
					</p>
				</footer>
			</Form>
		</section>
	);
};

export default Login;

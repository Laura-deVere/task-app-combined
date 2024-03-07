import type { ComponentPropsWithoutRef } from "react";

type ButtonDisplay = "primary" | "secondary" | "tertiary"; // maybe change to enum

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	text: string;
	display: ButtonDisplay;
}

import "./button.scss";

const className = "btn";
const classNamePrefix = `${className}__`;

const Button = ({ display, text, ...props }: ButtonProps) => {
	const defaultDisplay = display ? display : "primary";
	return (
		<button
			className={`${className} ${classNamePrefix}${defaultDisplay}`}
			{...props}
		>
			{text}
		</button>
	);
};

export default Button;

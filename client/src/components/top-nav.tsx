import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";

const className = "top-nav";
const classNamePrefix = `${className}__`;

const TopNav: React.FC<{ userName: string }> = ({ userName }) => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		navigate("/");
		await customFetch.get("/auth/logout");
		toast.success("You have been logged out");
	};

	return (
		<nav className={className}>
			<span className={`${classNamePrefix}icon`}>
				<IonIcon color='light' icon={"checkbox"} />
			</span>
			<div>
				{userName && (
					<>
						<span>Welcome back, </span>
						<span>{userName}</span>
					</>
				)}
			</div>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</nav>
	);
};

export default TopNav;

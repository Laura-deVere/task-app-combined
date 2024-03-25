import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { checkmarkDoneOutline } from "ionicons/icons";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import { CurrentUserContext } from "../context/current-user-context";

import Button from "./button/button";

const className = "top-nav";
const classNamePrefix = `${className}__`;

const TopNav = () => {
	const { user, handleUserSignOut } = useContext(CurrentUserContext);

	const navigate = useNavigate();

	const handleLogout = async () => {
		handleUserSignOut();
		await customFetch.get("/auth/logout");
		navigate("/login");
		toast.success("You have been logged out");
	};

	return (
		<nav className={className}>
			<span className={`${classNamePrefix}icon`}>
				<IonIcon color='light' icon={checkmarkDoneOutline} />
			</span>
			{user && (
				<>
					<div>
						{user.firstName && (
							<>
								<span>Welcome back, </span>
								<span>{user.firstName}</span>
							</>
						)}
					</div>
					<div>
						<Button
							onClick={handleLogout}
							display='tertiary'
							type='button'
							text='Logout'
						/>
					</div>
				</>
			)}
		</nav>
	);
};

export default TopNav;

import { IonIcon } from "@ionic/react";

const className = "top-nav";
const classNamePrefix = `${className}__`;

const TopNav: React.FC<{ userName: string }> = ({ userName }) => {
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
		</nav>
	);
};

export default TopNav;

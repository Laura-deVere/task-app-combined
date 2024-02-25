import { Outlet } from "react-router-dom";

import TopNav from "../components/top-nav";

const PageHome: React.FC<{}> = () => {
	return (
		<div id='pageHome'>
			<TopNav userName={"user?.firstName"} />
			<Outlet />
		</div>
	);
};

export default PageHome;

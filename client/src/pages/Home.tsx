import { Outlet } from "react-router-dom";

import { CurrentUserProvider } from "../context/current-user-context";

import TopNav from "../components/top-nav";

const PageHome = () => {
	return (
		<div id='app'>
			<CurrentUserProvider>
				<TopNav />
				<main id='main-content'>
					<Outlet />
				</main>
			</CurrentUserProvider>
		</div>
	);
};

export default PageHome;

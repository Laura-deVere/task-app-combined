import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'

import { ProjectsProvider } from "./context/projects-context";
import { getUser } from "./services/auth-api";

import TopNav from "./components/top-nav";
import NewProject from "./components/new-project/new-project";
import ProjectsList from "./components/project-list/projects-list";

import "./App.scss";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [user, setUser] = useState<any>(null);

	// useEffect(() => {
	// 	fetchUser();
	// }, []);

	// const fetchUser = async () => {
	// 	try {
	// 		const user = await getUser();
	// 		console.log("user", user);
	// 		if (user?._id) {
	// 			setUser(true);
	// 			setIsLoggedIn(true);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<>
			<TopNav userName={user?.firstName} />
			{isLoggedIn ? (
				<ProjectsProvider isLoggedIn={isLoggedIn}>
					<section className='section-prj-new'>
						<NewProject />
					</section>
					<section className='section-prj-list'>
						<ProjectsList />
					</section>
				</ProjectsProvider>
			) : (
				<div
					className='login'
					style={{
						color: "#fff",
						display: "flex",
						width: "100%",
						height: "100vh",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<p>Please login</p>
					<div>
						<button>Sign in</button>
						<button>Sign up</button>
					</div>
				</div>
			)}
		</>
	);
};

export default App;

import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { CurrentUserContext } from "../context/current-user-context";
import { ProjectsProvider } from "../context/projects-context";
import NewProject from "../components/new-project/new-project";
import ProjectsList from "../components/project-list/projects-list";

const REDIRECT_PATH = "/login";

const PageProjects = () => {
	const { user } = useContext(CurrentUserContext);

	if (!user) {
		return <Navigate to={REDIRECT_PATH} replace />;
	}

	return (
		<div id='pageProjects'>
			<ProjectsProvider isLoggedIn={user ?? false}>
				<section className='section-prj-new'>
					<NewProject />
				</section>
				<section className='section-prj-list'>
					<ProjectsList />
				</section>
			</ProjectsProvider>
		</div>
	);
};

export default PageProjects;

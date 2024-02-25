import React from "react";

import { ProjectsProvider } from "../context/projects-context";
import NewProject from "../components/new-project/new-project";
import ProjectsList from "../components/project-list/projects-list";

const PageProjects: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
	return (
		<ProjectsProvider isLoggedIn={isLoggedIn}>
			<section className='section-prj-new'>
				<NewProject />
			</section>
			<section className='section-prj-list'>
				<ProjectsList />
			</section>
		</ProjectsProvider>
	);
};

export default PageProjects;

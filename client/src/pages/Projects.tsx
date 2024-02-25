import React, { useMemo } from "react";
import { redirect, useLoaderData } from "react-router-dom";

import { ProjectsProvider } from "../context/projects-context";
import NewProject from "../components/new-project/new-project";
import ProjectsList from "../components/project-list/projects-list";
import customFetch from "../utils/customFetch";

export const loader = async () => {
	try {
		const { data } = await customFetch.get("/users/current-user");
		return data;
	} catch (error) {
		return redirect("/login");
	}
};

const PageProjects: React.FC<{}> = () => {
	const data = useLoaderData();
	const isLoggedIn = useMemo(() => {
		if (!data) return false;
		return data?.user ? true : false;
	}, [data]);
	console.log("isLoggedIn", isLoggedIn);
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

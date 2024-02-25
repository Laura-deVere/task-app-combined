import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageHome from "./pages/Home";
import PageError from "./pages/Error";
import PageLanding from "./pages/Landing";
import PageProjects from "./pages/Projects";
import PageRegister from "./pages/Register";
import PageLogin from "./pages/Login";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as ProjectsLoader } from "./pages/Projects";

import "./App.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PageHome />,
		errorElement: <PageError />,
		children: [
			{
				index: true,
				element: <PageLanding />,
			},
			{
				path: "register",
				element: <PageRegister />,
				action: registerAction,
			},
			{
				path: "login",
				element: <PageLogin />,
				action: loginAction,
			},
			{
				path: "projects",
				element: <PageProjects />,
				loader: ProjectsLoader,
			},
			{
				path: "/*",
				element: <PageError />,
			},
		],
	},
]);
const App = () => {
	return <RouterProvider router={router} />;
};

export default App;

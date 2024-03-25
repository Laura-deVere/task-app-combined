import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageHome from "./pages/Home";
import PageError from "./pages/Error";
import PageProjects from "./pages/Projects";
import PageRegister from "./pages/Register";
import PageLogin from "./pages/Login";

import { action as registerAction } from "./pages/Register";

import "./App.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <PageHome />,
		errorElement: <PageError />,
		children: [
			{
				// index: true,
				path: "login",
				element: <PageLogin />,
			},
			{
				path: "register",
				element: <PageRegister />,
				action: registerAction,
			},
			{
				path: "projects",
				index: true,
				element: <PageProjects />,
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

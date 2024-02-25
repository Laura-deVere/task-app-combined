import { RouterProvider, createBrowserRouter } from "react-router-dom";

import PageHome from "./pages/Home";
import PageError from "./pages/Error";
import PageLanding from "./pages/Landing";
import PageProjects from "./pages/Projects";
import PageRegister from "./pages/Register";
import PageLogin from "./pages/Login";

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
			},
			{
				path: "login",
				element: <PageLogin />,
			},
			{
				path: "projects",
				element: <PageProjects isLoggedIn={false} />,
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

import React from "react";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
		<ToastContainer position='bottom-center' autoClose={3000} />
	</React.StrictMode>
);

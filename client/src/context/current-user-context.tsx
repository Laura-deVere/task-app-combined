import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";

import PageLoading from "../pages/Loading";

const CurrentUserContext = createContext<any>(null);

type UserSignIn = {
	email: string;
	password: string;
};

const CurrentUserProvider: React.FC<{ children: any }> = ({ children }) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState();

	const timeoutRef = React.useRef<any>();

	useEffect(() => {
		if (!loggedIn) return;
		setLoading(true);
		getCurrentUser();
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [loggedIn]);

	async function getCurrentUser() {
		try {
			const { data } = await customFetch.get("/users/current-user");
			setUser(data);
			navigate("/projects");
		} catch (error) {
			navigate("/login");
		} finally {
			timeoutRef.current = setTimeout(() => {
				setLoading(false);
				timeoutRef.current = null;
			}, 1000);
		}
	}

	// const parseJwt = (token) => {
	//     const decode = JSON.parse(atob(token.split('.')[1]));
	//     console.log(decode);
	//     if (decode.exp * 1000 < new Date().getTime()) {
	//         // do log out
	//         console.log('Time Expired');
	//     }
	// };

	const handleUserSignOut = () => {
		setUser(undefined);
		setLoggedIn(false);
	};

	const handleSignIn = async (user: UserSignIn) => {
		try {
			await customFetch.post("/auth/login", user);
			toast.success("Login successful");
			setLoggedIn(true);
		} catch (err) {
			// toast.error(error?.response?.data?.message);
			toast.error("Login failed.");
			console.error(err);
			setLoggedIn(false);
		}
	};

	const value = useMemo(
		() => ({ user, handleUserSignOut, handleSignIn }),
		[user, handleUserSignOut, handleSignIn]
	);

	return (
		<CurrentUserContext.Provider value={value}>
			{loading ? <PageLoading /> : children}
		</CurrentUserContext.Provider>
	);
};

export { CurrentUserProvider, CurrentUserContext };

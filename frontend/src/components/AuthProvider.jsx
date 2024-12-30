import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";

import AuthContext from "../context/AuthContext.jsx";

function	AuthProvider({ children }) {
	const	[isAuthenticated, setIsAuthenticated] = useState(null);
	const	navigate = useNavigate();

	useEffect(() => {
		fetch("/api/current-user")
			.then(data => setIsAuthenticated(true))
			.catch(error => {
				console.log(error);
				setIsAuthenticated(false);
			});
	}, []);

	const	login = () => {
		window.location = "/api/auth/google";
		//setIsAuthenticated(true);
		//navigate("/");
		return ;
	}

	const	logout = () => {
		navigate("/api/logout");
		//setIsAuthenticated(false);
		return ;
	}

	const	value = useMemo(() => ({
		isAuthenticated,
		setIsAuthenticated,
		login,
		logout
	}), [isAuthenticated]);

	console.log(value);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;

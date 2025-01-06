import { useState, useMemo } from "react";
import { useNavigate } from "react-router";

import AuthContext from "../context/AuthContext.js";

function	AuthProvider({ children }) {
	const	[isAuthenticated, setIsAuthenticated] = useState(false);
	const	navigate = useNavigate();

	const	login = () => {
		window.location = "/api/auth/google";
		return ;
	}

	const	logout = () => {
		window.location = "/api/logout";
		return ;
	}

	const	value = useMemo(() => ({
		isAuthenticated,
		setIsAuthenticated,
		login,
		logout
	}), [isAuthenticated]);

	//console.log(value);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;

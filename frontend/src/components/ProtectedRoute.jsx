import { Navigate } from "react-router";

import useAuth from "../hooks/useAuth.jsx";

function	ProtectedRoute({ children }) {
	const	{ isAuthenticated } = useAuth();

	if (!isAuthenticated)
		return (<Navigate to="/login"/>);
	return (children);
}

export default ProtectedRoute;

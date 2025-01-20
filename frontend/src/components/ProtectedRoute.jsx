import { Navigate } from "react-router";
import { useEffect, useState } from "react";

import { getSession } from "../services/auth.js";

function	ProtectedRoute({ children }) {
	const	[page, setPage] = useState(undefined);
	const	login = <Navigate to="/login"/>;

	useEffect(() => {
		getSession()
			.then(user => {
				setPage(user ? children : login);
			})
			.catch(() => {
				setPage(login);
			});
	});

	return (page);
}

export default ProtectedRoute;

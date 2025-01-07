import { useNavigate } from "react-router";

import { getSession } from "../services/auth.js";

function	ProtectedRoute({ children }) {
	const navigate = useNavigate();

	getSession()
		.then(user => {
			if (!user)
				navigate("/login");
		})
		.catch((error) => {
			navigate("/login");
		});

	return (children);
}

export default ProtectedRoute;

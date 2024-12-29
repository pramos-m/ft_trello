//import { Link } from "react-router";

import useAuth from "../hooks/useAuth.jsx";

function	Logout() {
	const	{ logout } = useAuth();

	const	handleLogout = () => {
		logout();
		return ;
	}

	return (
		<button onClick={handleLogout}>Logout</button>
	);
}

export default Logout;

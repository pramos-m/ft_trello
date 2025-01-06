//import { Link } from "react-router";

import useAuth from "../hooks/useAuth.js";

export function	Logout() {
	const	{ logout } = useAuth();

	const	handleLogout = () => {
		logout();
		return ;
	}

	return (
		<button className="w-[5.25rem] h-[1.438rem] flex justify-center items-center gap-2 rounded-xl shadow-md drop-sahdow-md" onClick={handleLogout}>
			<img src="/icons/leave.svg"/>
			<span className="font-medium text-sm text-btn-grey">Logout</span>
		</button>
	);
}

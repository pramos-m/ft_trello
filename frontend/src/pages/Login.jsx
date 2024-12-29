//import { Link } from "react-router";

import useAuth from "../hooks/useAuth.jsx";

function	Login() {
	const	{ login } = useAuth();

	const	handleLogin = () => {
		login();
		return ;
	}

	return (
		<>
			<img className="w-24 h-24" src="/logo.svg"/>
			<button onClick={handleLogin}>Sign in with Google</button>
		</>
	);
}

export default Login;

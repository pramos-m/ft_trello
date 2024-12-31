//import { Link } from "react-router";

import useAuth from "../hooks/useAuth.jsx";

function	Login() {
	const	{ login } = useAuth();

	const	handleLogin = () => {
		login();
		return ;
	}

	return (
		<div className="bg-logos-white-bluish w-screen h-screen">
			<img className="w-[9.375rem] h-[9.375rem]" src="/logo.svg"/>
			<button className="bg-white rounded-3xl text-sm w-[12.125rem] h-[2.5rem] border-btn-grey-iron" onClick={handleLogin}>Sign in with Google</button>
			<h1 className="font-inter font-thin text-xl">FlowBoard</h1>
			<h1 className="font-inter font-light text-[.625rem]">COPYRIGHT 2024 PRAT EDUCACIÓ COMPANY</h1>
			</div>
	);
}

export default Login;

//import { Link } from "react-router";

import useAuth from "../hooks/useAuth.jsx";

function	Login() {
	const	{ login } = useAuth();

	const	handleLogin = () => {
		login();
		return ;
	}

	return (
		<div className="bg-logos-white-bluish w-screen h-screen flex flex-col justify-center items-center">
			<div className="flex-1 flex flex-col justify-center items-center gap-y-10">
				<img className="w-[9.375rem] h-[9.375rem]" src="/logo.svg"/>
				<button className="flex items-center justify-center gap-x-2.5 bg-white rounded-3xl w-[12.125rem] h-[2.5rem] border-2 border-btn-grey-iron" onClick={handleLogin}>
					<img src="/GoogleLogo.svg"/>
					<span className="font-medium text-sm">Sign in with Google</span>
				</button>
			</div>
			<div className="flex flex-col justify-around items-center gap-2 mb-8">
				<h1 className="font-inter font-thin text-xl">FlowBoard</h1>
				<h1 className="font-inter font-light text-[.625rem]">COPYRIGHT 2024 PRAT EDUCACIÓ COMPANY</h1>
			</div>
		</div>
	);
}

export default Login;

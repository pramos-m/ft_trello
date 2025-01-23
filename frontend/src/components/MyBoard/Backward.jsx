import { useNavigate } from "react-router";

function	Backward({to}) {
	const	navigate = useNavigate();

	return (
		<button className="w-12 h-12 rounded-lg bg-white shadow-md flex justify-center items-center" onClick={() => navigate(to)}>
			<img src="/icons/arrowLeft.svg" className="w-6"/>
		</button>
	);
}

export default Backward;

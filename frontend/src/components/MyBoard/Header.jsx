import Sidebar from "./Sidebar.jsx";
import Dropdown from "./Dropdown.jsx";

function	BoardHeader({title}) {
	return (
		<header className="px-6 py-4 relative z-0">
			<div className="flex justify-between items-center">
				<Sidebar title={title}/>
				<Dropdown/>
			</div>
		</header>
	);
}

export default BoardHeader;

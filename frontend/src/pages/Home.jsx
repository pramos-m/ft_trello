import { useBoards } from "../hooks/useBoards.js";
import { Logout } from "../components/Logout.jsx";
import { BoardsListLayout } from "../components/BoardsListLayout.jsx";

function	Home() {
	const	[boardss, refreshBoards, boardsError] = useBoards();
	//const	[categories, categoriesError] = useCategories();
	let	boards = [];
	let	categories = [
		{name: "Favorite", filter: ({favorite}) => favorite, create: false, direction: "x"},
		{name: "Recent", filter: ({recent}) => recent, create: false, direction: "x"},
		{name: "All", filter: () => true, create: true, direction: "y"},
	];

	for (let i = 0; i < 10; i++)
		boards.push({
			id: i,
			name: `Mallorca${i}`,
			color: "#DFE9FE",
			tasks: 30,
			lists: 6,
			favorite: i % 3,
			recent: i % 2
		});

	return (
		<div className="w-screen h-screen flex flex-col items-center gap-y-4">
			<div className=" w-[86.8%] h-[8.78%] flex flex-row justify-between items-start mt-4">
				<Logout/>
				<img src="/logo.svg" className="w-[5.188rem] h-[4.875rem]"/>
			</div>
			{
				categories && categories.map(({name, filter, create, direction}) => 
					<BoardsListLayout
						key={name} title={name} create={create}
						direction={direction} boards={boards.filter(filter)}
						refresh={refreshBoards} />
				)
			}
		</div>
	);
}
export default Home;

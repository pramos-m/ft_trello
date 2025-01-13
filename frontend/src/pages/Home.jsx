import useBoards from "../hooks/useBoards.js";
import { Logout } from "../components/Logout.jsx";
import { BoardsListLayout } from "../components/BoardsListLayout.jsx";

import { categories } from "../data/categories.js";

function	Home() {
	let	[boards, refreshBoards, boardsError] = useBoards();

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

	if (boardsError)
		console.error(boardsError["message"]);
	return (
		<div className="w-screen h-screen flex flex-col items-center gap-y-4">
			<div className=" w-[86.8%] h-[8.78%] flex flex-row justify-between items-start mt-4">
				<Logout/>
				<img src="/logo.svg" className="w-[5.188rem] h-[4.875rem]"/>
			</div>
			{
				boardsError ?
					<div className="max-w-[70%] bg-btn-grey-optionSelected px-10 py-5 rounded-2xl drop-shadow-md shadow-inner">
						<h1 className="text-red-500 font-semibold">{boardsError["message"]}</h1>
					</div>
				:
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

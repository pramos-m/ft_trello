import useBoard from "../../hooks/useBoard.js";
import Tasks from "./Tasks.jsx";

function	BoardList({name, tasksId}) {
	const	{ board } = useBoard();
	const tasks = board.tasks.filter(({id}) => tasksId.includes(id));

	return (
		<div className="w-[70%] shrink-0 grow-0">
			<div className="flex justify-between">
				<h1 className="font-semibold text-xl">{name}</h1>
				<h1 className="font-semibold text-xl">{tasks.length}</h1>
			</div>
			<Tasks tasks={tasks}/>
		</div>
	);
}

export default BoardList;

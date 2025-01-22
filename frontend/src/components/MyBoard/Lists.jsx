import { useCallback } from "react";

import useBoard from "../../hooks/useBoard.js";
import createList from "../../services/lists.js";
import List from "./List.jsx";
import AddList from "./AddList.jsx";
import useBoard from "../../hooks/useBoard.js";

function	BoardLists({lists}) {
	const	{ board } = useBoard();

	const	createNewList = useCallback(data => {
		createList({...data, boardId: board.id});
	}, [board]);

	return (
		<div className="flex items-start gap-x-8 ml-3">
			{
				lists && lists.map(list =>
					<List key={`list${list.id}`} name={list.name} tasksId={list.tasks}/>
				)
			}
			<AddList onCreate={createNewList}/>
		</div>
	);
}

export default BoardLists;

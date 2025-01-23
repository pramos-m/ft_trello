import { useCallback } from "react";

import useBoard from "hooks/useBoard.js";
import { createList } from "services/lists.js";
import List from "./List/List.jsx";
import AddList from "./List/AddList.jsx";

function	BoardLists({lists = []}) {
	const	{ board, refreshBoard } = useBoard();

	const	createNewList = useCallback(data => {
		console.log({data: {...data, boardId: board._id}});
		createList({data: {...data, boardId: board._id}})
			.then(() => refreshBoard());
	}, [board, refreshBoard]);

	return (
		<div className="flex items-start gap-x-8 ml-3">
			{
				lists.length > 0 && lists.map(list =>
					<List key={`list${list._id}`} id={list._id} name={list.name} description={list.description} tasksId={list.tasks}/>
				)
			}
			<AddList onCreate={createNewList}/>
		</div>
	);
}

export default BoardLists;

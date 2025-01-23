import { useCallback } from "react";

import useBoard from "hooks/useBoard.js";
import { createList } from "services/lists.js";
import List from "./List/List.jsx";
import AddList from "./List/AddList.jsx";

function	BoardLists({lists = []}) {
	const	{ board, refreshBoard } = useBoard();
	const	twClassName = `w-full h-full flex flex-nowrap flex-row gap-x-4 overflow-x-auto" hide-scrollbar`;

	const	createNewList = useCallback(data => {
		console.log({data: {...data, boardId: board.id}});
		createList({data: {...data, boardId: board.id}})
			.then(() => refreshBoard());
	}, [board, refreshBoard]);



	return (
		<div className="flex-1 flex items-start gap-x-8 ml-3">
			{
				lists.length > 0 && lists.map(list =>
					<List key={`list${list.id}`} id={list.id} name={list.name} description={list.description} tasks={list.tasks}/>
				)
			}
			<AddList onCreate={createNewList}/>
		</div>
	);
}

export default BoardLists;

import { useCallback } from "react";

import useBoard from "hooks/useBoard.js";
import { createList } from "services/lists.js";
import List from "./List/List.jsx";
import AddList from "./List/AddList.jsx";
import { Carousel } from "components/Carousel.jsx";

function	BoardLists({lists = []}) {
	const	{ board, refreshBoard } = useBoard();
	const twClassName = `w-full h-full flex items-start gap-x-4 overflow-x-auto hide-scrollbar pt-2`;

	const	createNewList = useCallback(data => {
		console.log({data: {...data, boardId: board.id}});
		createList({data: {...data, boardId: board.id}})
			.then(() => refreshBoard());
	}, [board, refreshBoard]);

	return (
		<div className="flex-1 overflow-hidden mx-3 mb-4">
			<Carousel twClassName={twClassName} direction="x">
				{
					lists.length > 0 && lists.map(list =>
						<List key={`list${list.id}`} id={list.id} name={list.name} description={list.description} tasks={list.tasks}/>
					)
				}
				<AddList onCreate={createNewList}/>
			</Carousel>
		</div>
	);
}

export default BoardLists;
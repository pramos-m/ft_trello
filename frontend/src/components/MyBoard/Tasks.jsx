import { useCallback } from "react";

import useBoard from "../../hooks/useBoard.js";
import { createTask } from "../../services/tasks.js";
import Task from "./Task.jsx";
import AddTask from "./AddTask.jsx";

function	BoardTasks({tasks, listId}) {
	const	{ refreshBoard } = useBoard();

	const	createNewTask = useCallback(data => {
		console.log({data: {...data, listId}});
		createTask({data: {...data, listId}})
			.then(() => refreshBoard());
	}, [refreshBoard]);

	return (
		<div className="flex flex-col gap-y-6 mt-3">
			{
				tasks && tasks.map(task => 
					<Task key={`task${task._id}`} name={task.name}/>
				)
			}
			<AddTask onCreate={createNewTask}/>
		</div>
	);
}

export default BoardTasks;

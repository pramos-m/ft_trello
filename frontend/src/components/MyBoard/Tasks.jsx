import Task from "./Task.jsx";
import AddTask from "./AddTask.jsx";

function	BoardTasks({tasks}) {
	return (
		<div className="flex flex-col gap-y-6 mt-3">
		{
			tasks && tasks.map(task => 
				<Task key={`task${task.id}`} name={task.name}/>
			)
		}
		<AddTask/>
		</div>
	);
}

export default BoardTasks;

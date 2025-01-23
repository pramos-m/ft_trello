import { useState, useCallback } from "react";

import useBoard from "hooks/useBoard.js";
import useClickOutside from "hooks/useClickOutside.js";
import { updateList } from "services/lists.js";
import Tasks from "components/MyBoard/Tasks.jsx";
import Form from "components/Form.jsx";

function	ListEdit({initialName, initialDescription, onSubmit, onClose}) {
	const	ref = useClickOutside(onClose);
	const	fields = [
		{
			name: "name",
			id: "name",
			initialValue: initialName,
			placeholder: "To Do, ..."
		},
		{
			name: "description",
			id: "description",
			initialValue: initialDescription,
			placeholder: "thing to do, ..."
		},
	];

	return (<Form fields={fields} submitTitle="Save" onSubmit={onSubmit} onClose={onClose} formProps={{ref}}/>);
}

function	ListHeader({id, name, description, tasksAmount, refresh}) {
	const	[editMode, setEditMode] = useState(false);

	const	toogleEditMode = () => {
		setEditMode(edit => !edit);
	};

	const	updateListFields = useCallback(data => {
		console.log({id, data});
		updateList({id, data})
			.then(() => {
				refresh();
				setEditMode(edit => !edit)
			});
	}, [id, refresh]);

	const	handleDragStart = useCallback(e => {
		e.stopPropagation();
	
		e.dataTransfer.setData("id", id);
		e.dataTransfer.setData("type", "list");
		return ;
	}, []);

	const	handleDragEnd = useCallback(e => {
		e.stopPropagation();
		e.preventDefault();

		return ;
	}, [id]);

	return (
		<>
			{
				editMode ?
					<ListEdit initialName={name} initialDescription={description} onSubmit={updateListFields} onClose={toogleEditMode}/>
				:
					<div
						className="grid grid-rows-2 grid-cols-6 break-words font-semibold text-xl"
						onClick={() => !editMode && toogleEditMode()}
						draggable
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
					>
						<h1 className="col-span-5">{name}</h1>
						<h1 className="place-self-end">{tasksAmount}</h1>
						<h1 className="col-span-full">{description}</h1>
					</div>
			}
		</>
	);
}

function	BoardList({id, name, description, tasks: tasksId}) {
	const	{ board, refreshBoard } = useBoard();
	const tasks = board.tasks ? board.tasks.filter(({id}) => tasksId.includes(id)) : [];

	return (
		<div
			className="w-[70%] max-w-[23rem] shrink-0 grow-0"
		>
			<ListHeader id={id} name={name} description={description} tasksAmount={tasks.length} refresh={refreshBoard}/>
			<Tasks tasks={tasks} listId={id}/>
		</div>
	);
}

export default BoardList;

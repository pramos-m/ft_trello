import { useState, useCallback } from "react";

import useBoard from "hooks/useBoard.js";
import { updateList } from "services/lists.js";
import Tasks from "components/MyBoard/Tasks.jsx";
import Form from "components/Form.jsx";

function	ListEdit({initialName, initialDescription, onSubmit, onClose}) {
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

	return (<Form fields={fields} submitTitle="Save" onSubmit={onSubmit} onClose={onClose}/>);
}

function	ListHeader({id, name, description, tasksAmount, refresh}) {
	const	[editMode, setEditMode] = useState(false);

	const	updateListFields = useCallback(data => {
		console.log({id, data});
		updateList({id, data})
			.then(() => {
				refresh();
				setEditMode(edit => !edit)
			});
	}, [id, refresh]);

	const	toogleEditMode = () => {
		setEditMode(edit => !edit);
	};

	return (
		<div className="flex justify-between" onClick={() => !editMode && toogleEditMode()}>
			{
				editMode ?
					<ListEdit initialName={name} initialDescription={description} onSubmit={updateListFields} onClose={toogleEditMode}/>
				:
					<>
						<h1 className="font-semibold text-xl">{name}</h1>
						<h1 className="font-semibold text-xl">{description}</h1>
						<h1 className="font-semibold text-xl">{tasksAmount}</h1>
					</>
			}
		</div>
	);
}

function	BoardList({id, name, description, tasksId}) {
	const	{ board, refreshBoard } = useBoard();
	const tasks = board.tasks ? board.tasks.filter(({id}) => tasksId.includes(id)) : [];

	console.log(tasksId);

	return (
		<div className="w-[70%] max-w-[23rem] shrink-0 grow-0">
			<ListHeader id={id} name={name} description={description} tasksAmount={tasks.length} refresh={refreshBoard}/>
			<Tasks tasks={tasksId} listId={id}/> {/*The tasks variables will be used when merging and get the right format from backend*/}
		</div>
	);
}

export default BoardList;

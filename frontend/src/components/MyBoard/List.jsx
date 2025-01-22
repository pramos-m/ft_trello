import { useState, useCallback } from "react";

import useBoard from "../../hooks/useBoard.js";
import useMergeState from "../../hooks/useMergeState.js";
import { updateList } from "../../services/lists.js";
import Tasks from "./Tasks.jsx";

function	FormLabel({children, htmlFor}) {
	return (
		<label htmlFor={htmlFor}>
			{children}
		</label>
	);
}

function	FormInput({id, name, placeholder, value, onChange}) {
	return (
		<input
			className="p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm"
			id={id} placeholder={placeholder} name={name} value={value} onChange={onChange}
		/>
	);
}

function	Form({fields, submitTitle, onSubmit, onClose}) {
	const [fieldsValue, mergeFieldsValue] = useMergeState(Object.fromEntries(fields.map(({name, initialValue}) => ([name, initialValue]))));

	const	updateFormValue = e => {
		e.preventDefault();
		mergeFieldsValue({[e.target.name]: e.target.value});
	};

	const	handleSubmit = e => {
		e.preventDefault();

		const	data = Object.fromEntries(new FormData(e.target));

		onSubmit(data);
	};

	return (
		<form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
			{
				fields?.length > 0 && fields.map(({id, placeholder, name}) => {
					console.log(name, fieldsValue[name]);
					return <label key={id} htmlFor={`input${id}`}>
						<input
					className="w-full h-full p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm"
					id={`input${id}`} placeholder={placeholder} name={name} value={fieldsValue[name]} onChange={updateFormValue}
						/>
						</label>
				}
				)
			}
			<div className="flex justify-between">
				<button type="submit" className="w-2/5 text-sm rounded bg-neutral-200 p-1">
					{submitTitle}
				</button>
				<button type="button" onClick={onClose}>
					<img src="/public/icons/close.svg" className="w-3"/>
				</button>
			</div>
		</form>
	);
}

function	ListEdit({initialName, initialDescription, onSubmit, onClose}) {
	const	fields = [
		{name: "name", id: "name", initialValue: initialName, placeholder: "To Do, ..."},
		{name: "description", id: "description", initialValue: initialDescription, placeholder: "thing to do, ..."},
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
	// const	[editMode, setEditMode] = useState(false);
	// const	[{name, description}, mergeDetails] = useMergeState({name: initialName, description: initialDescription});
	const tasks = board.tasks ? board.tasks.filter(({id}) => tasksId.includes(id)) : [];

	console.log(tasksId);

	// const	updateFormValue = e => {
	// 	mergeDetails({[e.target.name]: e.target.value});
	// };


	return (
		<div className="w-[70%] max-w-[23rem] shrink-0 grow-0">
			<ListHeader id={id} name={name} description={description} tasksAmount={tasks.length} refresh={refreshBoard}/>
			<Tasks tasks={tasksId} listId={id}/> {/*The tasks variables will be used when merging and get the right format from backend*/}
		</div>
	);
}

// <div className="flex justify-between" onClick={() => !editMode && setEditMode(edit => !edit)}>
// 	{
// 		editMode ?
// 			<form className="flex flex-col gap-y-2">
// 				<label htmlFor="name">
// 					<input
// 						className="p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm"
// 						id="name" placeholder="To Do, ..." name="name" value={name} onChange={updateFormValue}
// 					/>
// 				</label>
// 				<label htmlFor="description">
// 					<input
// 						className="p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm"
// 						id="description" placeholder="thing to do, ..." name="description" value={description}
// 						onChange={updateFormValue}
// 					/>
// 				</label>
// 			</form>
// 		:
// 			<>
// 				<h1 className="font-semibold text-xl">{name}</h1>
// 				<h1 className="font-semibold text-xl">{tasks.length}</h1>
// 			</>
// 	}
// </div>
export default BoardList;

import { useState, useEffect, useReducer, useCallback } from "react";
import { useParams } from "react-router";

import BoardContext from "../../context/BoardContext.js";
import useMergeState from "../../hooks/useMergeState.js";
import { getBoard, updateBoard } from "../../services/boards.js";
import { updateList } from "../../services/lists.js";
import { updateTask } from "../../services/tasks.js";
import { updateLabel } from "../../services/labels.js";

const	formatedUpdater = (array, {itemId, fields}) => updateArrayItemFieldsById(array, itemId, fields);

const	localBoardFieldUpdaters = {
	lists: formatedUpdater,
	tasks: formatedUpdater,
	labels: formatedUpdater,
	background: (_, newVal) => newVal,
};

const	boardFieldUpdaters = {
	lists: updateList,
	tasks: updateTask,
	labels: updateLabel,
	board: updateBoard,
};

function	BoardProvider({children})
{
	const	{ boardId: id } = useParams();
	// const	[board, setBoard] = useReducer(boardsReducer, {id});
	const [board, setBoard] = useMergeState({})
	const	[error, setError] = useState(null);

	const	refreshBoard = useCallback(() => {
		getBoard({id})
			.then(data => setBoard(data))
			.catch(err => setError(err));
	}, [id]);

	const	removeBoard = useCallback(() => {
		deleteBoard({id})
			.then(() => navigate("/"))
			.catch(err => setError(err));
	}, [id]);

	useEffect(refreshBoard, []);

	const	updateLocalBoardField = (name, value, updater = null) => {
		if (!updater)
			updater = localBoardFieldUpdaters[name];

		setBoard(board => ({
			...board,
			[name]: updater(board[name], value),
		}));
		return ;
	};

	const	updateBoardField = (name, id, value, cb = null) => {
		const	updater = boardFieldUpdaters[name];
		const	localUpdater = cb == null ? localBoardFieldUpdaters[name] : cb;

		updater()
			.then(() => localUpdater(id, value));
	}

	return (
    <BoardContext.Provider
      value={{
				board,
				error,
				updateLocalBoardField,
				refreshBoard,
				removeBoard,
			}}
		>
			{children}
    </BoardContext.Provider>
	);
}

function	boardsReducer(board, action)
{
	switch (action.type) {
		case 'added': {
			return [...tasks, {
				id: action.id,
				text: action.text,
				done: false
			}];
		}
		default: {
      throw Error('Unknown action: ' + action.type);
    }
	}
}

export default BoardProvider;

import { useState, useEffect, useReducer, useCallback } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import BoardContext from "../../context/BoardContext.js";
import useMergeState from "../../hooks/useMergeState.js";
import getBoard from "../../services/boards.js";

const	formatedUpdater = (array, {itemId, fields}) => updateArrayItemFieldsById(array, itemId, fields);

const	boardFieldUpdaters = {
	lists: formatedUpdater,
	tasks: formatedUpdater,
	labels: formatedUpdater,
	background: (_, newVal) => newVal,
};

function	BoardProvider({children})
{
	const	{ boardId: id } = useParams();
	// const	[board, setBoard] = useReducer(boardsReducer, {id});
	const [board, setBoard] = useMergeState({})
	const	[error, setError] = useState(null);

	const	refreshBoard = () => {
		getBoard({id})
			.then(data => setBoard(data))
			.catch(err => setError(err));
	};

	const	removeBoard = () => {
		deleteBoard({id})
			.then(() => navigate("/"))
			.catch(err => setError(err));
	};

	useEffect(refreshBoard, [id]);

	const	updateLocalBoardField = (name, value, updater = null) => {
		if (!updater)
			updater = boardFieldUpdaters[name];

		setBoard(board => ({
			...board,
			[name]: updater(board[name], value),
		}));
		return ;
	};

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

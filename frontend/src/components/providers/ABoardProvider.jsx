import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import BoardContext from "../../context/BoardContext.js";

function	BoardProvider({children})
{
	const	{ boardId: id } = useParams();
	const	[board, setBoard] = useReducer(boardsReducer, {id});
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

	return (
    <BoardContext.Provider
      value={{
				error,
				board,
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

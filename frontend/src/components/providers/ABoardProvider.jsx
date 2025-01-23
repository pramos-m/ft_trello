import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";

import BoardContext from "../../context/BoardContext.js";
import useMergeState from "../../hooks/useMergeState.js";
import { getBoard, updateBoard, deleteBoard } from "../../services/boards.js";
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
	const	navigate = useNavigate();
	const [board, setBoard] = useMergeState({})
	const	[error, setError] = useState(null);
	const [filters, updateFilters] = useMergeState({
		effort: 'None',
		priority: 'None'
	  });

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

	const getFilteredCards = (cards) => {
		return cards.filter(card => {
		  const effortMatch = filters.effort === 'None' || card.effort === filters.effort;
		  const priorityMatch = filters.priority === 'None' || card.priority === filters.priority;
		  return effortMatch && priorityMatch;
		});
	  };
	
	  const getTotalFilteredCards = () => {
		return (board.lists).reduce((total, list) => {
		  const filteredListCards = getFilteredCards(board.tasks.filter(({id}) => list.tasks.includes(id)));
		  return total + filteredListCards.length;
		}, 0);
	  };

	return (
    <BoardContext.Provider
      value={{
				board,
				error,
				updateLocalBoardField,
				refreshBoard,
				removeBoard,
				getTotalFilteredCards,
				getFilteredCards,
				updateFilters,
				filters,
			}}
		>
			{children}
    </BoardContext.Provider>
	);
}

export default BoardProvider;

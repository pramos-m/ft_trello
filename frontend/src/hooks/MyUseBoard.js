import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getBoard, deleteBoard } from "../services/boards";

function	useBoard() {
	const	{ boardId: id } = useParams();
	const	[board, setBoard] = useState({});
	const	[error, setError] = useState(null);
	const	navigate = useNavigate();

	const	refreshBoard = () => {
		getBoard({id})
			.then(board => setBoard(board))
			.catch(err => setError(err));
	};

	const	removeBoard = () => {
		deleteBoard({id})
			.then(({succes}) => succes ? navigate("/") : console.error(";-;"))
			.catch(err => setError(err))
	};

	useEffect(refreshBoard, [id]);
	return ([board, refreshBoard, removeBoard, error]);
}

export default useBoard;

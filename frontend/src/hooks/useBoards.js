import { useState, useEffect } from "react";

import { getBoards } from "../services/boards.js";

function	useBoards() {
	const	[boards, setBoards] = useState([]);
	const	[error, setError] = useState(null);

	const	refreshBoards = () => {
		getBoards()
			.then(boards => setBoards(boards))
			.catch(err => setError(err));
	}

	useEffect(refreshBoards, []);
	return ([boards, refreshBoards, error]);
}

export default useBoards;

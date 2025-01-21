import { useState, useCallback } from "react";

import { isFunction } from "../utils/type.js";

function	useMergeState(initialState) {
	const [state, setState] = useState(initialState || {});

	const	mergeState = useCallback(newState => {
		const	updatedState = isFunction(newState) ? newState(currentState) : newState;

		setState(state => ({...state, ...updatedState}));
	}, []);

	return [state, mergeState];
}

export default useMergeState;

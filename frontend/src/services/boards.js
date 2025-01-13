import fetcher from "./fetcher.js";

export function	getBoards() {
	return (fetcher.getJson({
		url: "/api/boards/me"
	}));
}

export function	createBoard({data}) {
	return (fetcher.getJson({
		url: "/api/boards",
		data
	}));
}

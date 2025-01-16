import fetcher from "./fetcher.js";

const	baseUrl = "/api/boards";

export function	getBoards() {
	return (fetcher.getJson({
		url: `${baseUrl}/me`,
	}));
}

export function	createBoard({data}) {
	return (fetcher.postJson({
		url: baseUrl,
		data
	}));
}

export function	getBoard({id}) {
	return (fetcher.getJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	deleteBoard({id}) {
	return (fetcher.deleteJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	updateBoard({id, data}) {
	return (fetcher.patchJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

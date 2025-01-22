import fetcher from "./fetcher.js";

const	baseUrl = "/api/lists";

export function	getList({id}) {
	return (fetcher.getJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	createList({data}) {
	return (fetcher.postJson({
		url: baseUrl,
		data
	}));
}

export function updateList({id, data}) {
	return (fetcher.patchJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	replaceList({id, data}) {
	return (fetcher.putJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	deleteList({id}) {
	return (fetcher.deleteJson({
		url: `${baseUrl}/${id}`,
	}));
}

import fetcher from "./fetcher.js";

const	baseUrl = "/api/lists";

export function	getColumn({id}) {
	return (fetcher.getJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	createColumn({data}) {
	return (fetcher.postJson({
		url: baseUrl,
		data
	}));
}

export function updateColumn({data, id}) {
	return (fetcher.patchJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	replaceColumn({data, id}) {
	return (fetcher.putJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	deleteColumn({id}) {
	return (fetcher.deleteJson({
		url: `${baseUrl}/${id}`,
	}));
}

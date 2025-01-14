import fetcher from "./fetcher.js";

const	baseUrl = "/api/cards";

export function	getCard({id}) {
	return (fetcher.getJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	createCard({data}) {
	return (fetcher.postJson({
		url: baseUrl,
		data
	}));
}

export function	updateCard({data, id}) {
	return (fetcher.patchJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	replaceCard({data, id}) {
	return (fetcher.putJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	deleteCard({id}) {
	return (fetcher.deleteJson({
		url: `${baseUrl}/${id}`,
	}));
}

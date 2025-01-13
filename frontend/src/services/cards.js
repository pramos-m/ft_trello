import fetcher from "./fetcher.js";

export function	createCard({data}) {
	return (fetcher.postJson({
		url: "/api/cards",
		data
	}));
}

export function	updateCard({data, id}) {
	return (fetcher.patchJson({
		url: `/api/cards/${id}`,
		data
	}));
}

export function	replaceCard({data, id}) {
	return (fetcher.putJson({
		url: `/api/cards/${id}`,
		data
	}));
}

export function	deleteCard({id}) {
	return (fetcher.deleteJson({
		url: `/api/cards/${id}`,
	}));
}

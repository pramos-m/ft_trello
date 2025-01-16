import fetcher from "./fetcher.js";

const	baseUrl = "/api/labels";

export function	getLabel({id}) {
	return (fetcher.getJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	createLabel({data}) {
	return (fetcher.postJson({
		url: baseUrl,
		data
	}));
}

export function	updateLabel({id, data}) {
	return (fetcher.patchJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	replaceLabel({id, data}) {
	return (fetcher.putJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	deleteLabel({id}) {
	return (fetcher.deleteJson({
		url: `${baseUrl}/${id}`,
	}));
}

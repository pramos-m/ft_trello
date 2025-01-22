import fetcher from "./fetcher.js";

const	baseUrl = "/api/tasks";

export function	getTask({id}) {
	return (fetcher.getJson({
		url: `${baseUrl}/${id}`,
	}));
}

export function	createTask({data}) {
	return (fetcher.postJson({
		url: baseUrl,
		data
	}));
}

export function	updateTask({id, data}) {
	return (fetcher.patchJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	replaceTask({id, data}) {
	return (fetcher.putJson({
		url: `${baseUrl}/${id}`,
		data
	}));
}

export function	deleteTask({id}) {
	return (fetcher.deleteJson({
		url: `${baseUrl}/${id}`,
	}));
}

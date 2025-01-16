const	fetcher = {

	getJson({url}) {
		return (
			fetch(url, { method: "GET" })
				.then(res => {
					if (!res.ok)
					{
						console.log(res.statusText);
						throw new Error("Failed to fetch json data - [GET]");
					}
					return (res.json());
				})
		);
	},

	postJson({url, data}) {
		return (
			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(res => {
				if (!res.ok)
				{
					console.log(res.statusText);
					throw new Error("Failed to fetch json data - [POST]");
				}
				return (res.json());
			})
		);
	},

	putJson({url, data}) {
		return (
			fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(res => {
				if (!res.ok)
				{
					console.log(res.statusText);
					throw new Error("Failed to fetch json data - [PUT]");
				}
				return (res.json());
			})
		);
	},

	patchJson({url, data}) {
		return (
			fetch(url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			.then(res => {
				if (!res.ok)
				{
					console.log(res.statusText);
					throw new Error("Failed to fetch json data - [PATCH]");
				}
				return (res.json());
			})
		);
	},

	deleteJson({url}) {
		return (
			fetch(url, { method: "DELETE" })
				.then(res => {
					if (!res.ok)
					{
						console.log(res.statusText);
						throw new Error("Failed to fetch json data - [DELETE]");
					}
					return (res.json());
				})
		);
	},

};

export default fetcher;

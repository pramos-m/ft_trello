
export function	getBoards() {
	return (
		fetch("/api/boards/me", { method: "GET" })
			.then(res => {
				if (!res.ok)
					throw new Error("Failed to fetch boards");
				return (res.json());;
			})
	);
}

export function	createBoard({data}) {
	return (
		fetch("/api/board/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(res => {
				if (!res.ok)
					throw new Error("Failed to fetch boards");
				return (res.json());
			})
	);
}

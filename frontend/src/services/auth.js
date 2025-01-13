import fetcher from "./fetcher.js";

export const getSession = () => {
	return (fetcher.getJson({
		url: "/api/auth/session"
	}));
};

export const	categories = [
		{name: "Favorite", filter: ({favorite}) => favorite, create: false, direction: "x"},
		{name: "Recent", filter: ({recent}) => recent, create: false, direction: "x"},
		{name: "All", filter: () => true, create: true, direction: "y"},
	];

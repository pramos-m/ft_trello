import { Trash2, Star } from 'lucide-react';
import React from "react";
import { createRoot } from "react-dom/client";

import useBoard from "hooks/useBoard.js";
import { updateBoard } from "services/boards.js";
import DropdownMenu from 'components/common/DropDownMenu.jsx';

function ConfirmPopup({ query, onConfirm, onDeny }) {
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
		>
			<div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-xl text-center space-y-4">
				<h1 className="text-lg font-semibold text-gray-800">
					{query}
				</h1>
				<div className="flex justify-around">
					<button
						onClick={onConfirm}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all"
					>
						Delete
					</button>
					<button
						onClick={onDeny}
						className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

function	BoardDropdown() {
	const	{ board, refreshBoard: refresh, removeBoard } = useBoard();

	const	handleSetFavorite = () => {
		updateBoard({id: board.id, data: {favorite: !board.favorite}})
			.finally(refresh);
		return ;
	}

	const	handleRemoveBoard = e => {
		const div = document.createElement("div");
		const	root = createRoot(div);
		e.target.appendChild(div);

		const	onDeny = () => e.target.removeChild(div);

		root.render(ConfirmPopup({query: "Are you sure you want to delete the board?", onConfirm: removeBoard, onDeny}));
		return ;
	}

	const menuItems = [
		{
			icon: <Star size={16} className={board.favorite ? "fill-current text-yellow-400" : ""} />,
			label: "Favorite",
			onClick: handleSetFavorite,
		},
		{
			icon: <Trash2 size={16} />,
			label: "Delete",
			onClick: handleRemoveBoard
		}
	];

	return (
		<DropdownMenu items={menuItems} />
	);
}

export default BoardDropdown;

import { Trash2, Star } from 'lucide-react';
import React from "react";
import { createRoot } from "react-dom/client";

import useBoard from "hooks/useBoard.js";
import { updateBoard } from "services/boards.js";
import DropdownMenu from 'components/common/DropDownMenu.jsx';

function	ConfirmPopup({query, onConfirm, onDeny}) {
	return (
		<div onClick={e => e.stopPropagation()} className="w-screen h-screen absolute top-[-52px] right-[-25px] flex justify-center items-center bg-blurBackground-dark/75">
			<div className="bg-white w-[60%] h-[12%] break-words rounded grid grid-cols-2 grid-rows-2">	
				<h1 className="col-span-2 place-self-center px-2">
					{query}
				</h1>
				<button onClick={onConfirm} className="">
					Confirm
				</button>
				<button onClick={onDeny} className="">
					Deny
				</button>
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

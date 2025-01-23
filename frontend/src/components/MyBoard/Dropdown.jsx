import { useState } from 'react';
import { Trash2, Star } from 'lucide-react';

import useBoard from "hooks/useBoard.js";
import { updateBoard } from "services/boards.js";
import DropdownMenu from 'components/common/DropDownMenu.js';

function	BoardDropdown() {
	const	{ board, refreshBoard } = useBoard();

	const	handleSetFavorite = () => {
		updateBoard();
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
			onClick: () => {/* Add delete functionality */}
		}
	];

	return (
		<DropdownMenu items={menuItems} />
	);
}

export default BoardDropdown;

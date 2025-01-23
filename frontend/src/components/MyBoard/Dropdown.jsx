import { useState } from 'react';
import { Trash2, Star } from 'lucide-react';

import DropdownMenu from 'components/common/DropDownMenu.js';

function	BoardDropdown() {
	const [isFavorite, setIsFavorite] = useState(false);
	const menuItems = [
		{
			icon: <Star size={16} className={isFavorite ? "fill-current text-yellow-400" : ""} />,
			label: "Favourite",
			onClick: () => setIsFavorite(!isFavorite)
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

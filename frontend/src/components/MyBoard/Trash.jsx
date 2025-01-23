import { useState } from "react";
import { Trash2 } from 'lucide-react';

function	BoardTrash() {
	const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);
	const	iconSize = 24;

	const handleTrashDragOver = (e) => {
		e.preventDefault();
		setIsDraggingOverTrash(true);
		return ;
	};

	const handleTrashDragLeave = () => {
		setIsDraggingOverTrash(false);
		return ;
	};

	const handleTrashDrop = (e) => {
		e.preventDefault();
		// const columnId = e.dataTransfer.getData('columnId');
		// if (columnId && columns[columnId]) {
		//	 deleteColumn(columnId);
		// } else if (draggingCard) {
		//	 const columnId = Object.keys(columns).find((colId) =>
		//		 columns[colId].cards.some((card) => card.id === draggingCard.id)
		//	 );
		//	 if (columnId) {
		//		 deleteCard(columnId, draggingCard.id);
		//	 }
		// }
		setIsDraggingOverTrash(false);
		// setDraggingCard(null);
		return ;
	};

	return (
		<button
			className={`w-12 h-12 rounded-lg border-2 ${
				isDraggingOverTrash ?
					"border-neutral-grey-300 bg-white"
				:
					"border-neutral-grey-300 bg-white"
			} shadow-md flex justify-center items-center`}
			onDragOver={handleTrashDragOver}
			onDragLeave={handleTrashDragLeave}
			onDrop={handleTrashDrop}
		>
			<img src="/icons/trash.svg" className="w-5"/>
		</button>
	);
}
// <div
// 	className={`fixed bottom-6 right-6 rounded-lg border-2 ${
// 		isDraggingOverTrash
// 			? 'border-red-500 bg-red-100'
// 			: 'border-neutral-grey-300 bg-white'
// 	} p-4 shadow-lg transition-colors`}
// 	onDragOver={handleTrashDragOver}
// 	onDragLeave={handleTrashDragLeave}
// 	onDrop={handleTrashDrop}
// >
// 	<Trash2
// 		size={iconSize}
// 		className={isDraggingOverTrash ? 'text-red-500' : 'text-neutral-grey-600'}
// 	/>
// </div>

export default BoardTrash;

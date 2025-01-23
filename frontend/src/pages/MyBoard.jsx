import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import useBoard from 'hooks/useBoard.js';

import Column from 'components/board/Column';
import AddColumn from 'components/board/AddColumn';

import Header from "components/MyBoard/Header.jsx";
import Lists from "components/MyBoard/Lists/Lists.jsx";

function	Board() {
	const	{ board, error } = useBoard();

	if (error)
		return (
			<h1 className="text-xl text-red-500 font-semibold">
				There was some error trying to connect to server
			</h1>
		);

	return (
		<div
			className="w-screen h-screen"
			style={{backgroundColor: board.color}}
		>
			<Header title={board.name}/>
			<Lists lists={board.lists}/>
		</div>
	);
}

function	BoardPrev() {
	const [draggingCard, setDraggingCard] = useState(null);
	const [isDraggingColumn, setIsDraggingColumn] = useState(false);

	return (
		<div className="min-h-screen bg-neutral-grey-50 flex">

			<div className="flex-1">

				{/* Contenido principal */}
				<div className={`p-6 transition-all duration-300 ${showSidebar ? 'blur-sm' : ''}`}>
					<div className="flex items-start gap-4 overflow-x-auto pb-4">
						<motion.div className="flex gap-4">
							{/* Añadir columnas o mostrar las existentes */}
							{Object.values(columns).length === 0 ? (
								<AddColumn />
							) : (
								<>
									{Object.values(columns).map((column, index) => (
										<Column
											key={column.id}
											column={column}
											draggingCard={draggingCard}
											setDraggingCard={setDraggingCard}
											index={index}
											isDraggingColumn={isDraggingColumn}
											setIsDraggingColumn={setIsDraggingColumn}
										/>
									))}
									<AddColumn />
								</>
							)}
						</motion.div>
					</div>
				</div>

				{/* Papelera flotante */}
			</div>
		</div>
	);
}

export default Board;

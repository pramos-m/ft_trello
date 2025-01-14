import { useParams } from "react-router";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useBoard from '../hooks/useBoard.js';
import Column from '../components/board/Column';
import AddColumn from '../components/board/AddColumn';
import { Trash2, Star, ChevronLeft } from 'lucide-react';
import DropdownMenu from '../components/common/DropDownMenu';
import SidebarMenu from '../components/common/SidebarMenu';

function	BoardMenu() {
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

function	BoardHeader({title}) {
	const	toggleSidebar = () => {};
	const	showSidebar = false;

	return (
		<header className="border-b border-neutral-grey-200 bg-white px-6 py-4 relative z-0">
			<div className="flex justify-between items-center">
				<button
					onClick={toggleSidebar}
					className="flex items-center gap-2 hover:bg-gray-50 rounded px-2 py-1"
				>
					<ChevronLeft
						size={20}
						className={`transition-transform ${!showSidebar ? 'rotate-180' : ''}`}
					/>
					<h1 className="text-xl font-medium text-neutral-grey-800">{title}</h1>
				</button>
			</div>
			<BoardMenu/>
		</header>
	);
}

function	Board() {
	const	{ title } = useBoard();

	return (
		<div>
			<BoardHeader title="Mallorca"/>
		</div>
	);
}

function	BoardPrev() {
	const { id } = useParams();

  const { columns, deleteCard, deleteColumn } = useBoard();
  const [draggingCard, setDraggingCard] = useState(null);
  const [isDraggingColumn, setIsDraggingColumn] = useState(false);
  const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);


  // Gestión de la papelera
  const handleTrashDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOverTrash(true);
  };

  const handleTrashDragLeave = () => {
    setIsDraggingOverTrash(false);
  };

  const handleTrashDrop = (e) => {
    e.preventDefault();
    const columnId = e.dataTransfer.getData('columnId');
    if (columnId && columns[columnId]) {
      deleteColumn(columnId);
    } else if (draggingCard) {
      const columnId = Object.keys(columns).find((colId) =>
        columns[colId].cards.some((card) => card.id === draggingCard.id)
      );
      if (columnId) {
        deleteCard(columnId, draggingCard.id);
      }
    }
    setIsDraggingOverTrash(false);
    setDraggingCard(null);
  };

  // Abre/cierra el sidebar
  const toggleSidebar = () => setShowSidebar(prev => !prev);

  return (
    <div className="min-h-screen bg-neutral-grey-50 flex">
      {/* Overlay cuando el sidebar está abierto */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl z-20"
          >
            <SidebarMenu onClose={toggleSidebar} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1">
        {/* Header */}

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
        <div
          className={`fixed bottom-6 right-6 rounded-lg border-2 ${
            isDraggingOverTrash
              ? 'border-red-500 bg-red-100'
              : 'border-neutral-grey-300 bg-white'
          } p-4 shadow-lg transition-colors`}
          onDragOver={handleTrashDragOver}
          onDragLeave={handleTrashDragLeave}
          onDrop={handleTrashDrop}
        >
          <Trash2
            size={24}
            className={isDraggingOverTrash ? 'text-red-500' : 'text-neutral-grey-600'}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;

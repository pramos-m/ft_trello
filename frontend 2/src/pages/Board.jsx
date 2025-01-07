import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBoard } from '../context/BoardContext';
import Column from '../components/board/Column';
import AddColumn from '../components/board/AddColumn';
import { Trash2 } from 'lucide-react';

export default function Board() {
  const { columns, deleteCard, deleteColumn } = useBoard();
  const [draggingCard, setDraggingCard] = useState(null);
  const [isDraggingColumn, setIsDraggingColumn] = useState(false);
  const [isDraggingOverTrash, setIsDraggingOverTrash] = useState(false);

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

  return (
    <div className="min-h-screen bg-neutral-grey-50">
      <header className="border-b border-neutral-grey-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-neutral-grey-800">Mallorca</h1>
      </header>
      <div className="p-6">
        <div className="flex items-start gap-4 overflow-x-auto pb-4">
          <motion.div className="flex gap-4" >
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
  );
}
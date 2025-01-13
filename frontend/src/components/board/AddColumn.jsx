import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import useBoard from '../../hooks/useBoard.js';

export default function AddColumn() {
  const { addColumn } = useBoard();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addColumn(title.trim());
    setTitle('');
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <motion.div layout className="w-72 shrink-0">
        <form onSubmit={handleSubmit} className="rounded-lg bg-neutral-100 p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-neutral-200 px-2 py-1 text-sm"
            placeholder="Enter column title..."
            autoFocus
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded p-1 hover:bg-neutral-200"
            >
              <X size={14} />
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-400"
            >
              Add Column
            </button>
          </div>
        </form>
      </motion.div>
    );
  }

  return (
    <motion.div  className="w-72 shrink-0">
      <button
        onClick={() => setIsAdding(true)}
        className="flex h-24 w-full items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-300 p-4 text-neutral-600 hover:bg-neutral-50"
      >
        <Plus size={14} />
        Add another column
      </button>
    </motion.div>
  );

}

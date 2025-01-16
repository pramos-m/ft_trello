import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useBoard } from '../../context/BoardContext';

export default function AddColumn() {
  const { addColumn } = useBoard();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const editRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addColumn(title.trim(), description.trim());
    setTitle('');
    setDescription('');
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle clicking outside
  const handleClickOutside = (event) => {
    if (editRef.current && !editRef.current.contains(event.target)) {
      setIsAdding(false);
      setTitle('');
      setDescription('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isAdding) {
    return (
      <motion.div layout className="w-72 shrink-0">
        <div className="bg-[#F1F4FF] rounded-lg">
          <div ref={editRef} className="px-4 py-3">
            <div className="flex justify-between items-center mb-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-base font-medium bg-transparent rounded border border-neutral-300 px-2 py-1 focus:outline-none focus:border-blue-500"
                placeholder="Enter column title..."
                autoFocus
              />
            </div>
            <div className="mt-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm resize-vertical bg-transparent focus:outline-none focus:border-blue-500"
                rows={2}
                placeholder="Add description..."
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="w-72 shrink-0">
      <button
        onClick={() => setIsAdding(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F1F4FF] px-4 py-3 text-neutral-600 hover:bg-[#E5E9FF] transition-colors"
      >
        <Plus size={16} className="transition-transform group-hover:scale-110" />
        Add another column
      </button>
    </motion.div>
  );
}
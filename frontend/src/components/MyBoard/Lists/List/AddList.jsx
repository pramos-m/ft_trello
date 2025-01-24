import { useState } from "react";
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import useClickOutside from "hooks/useClickOutside.js";

function BoardAddList({ onCreate }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const ref = useClickOutside(() => {
    setIsAdding(false);
    setTitle('');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ name: title.trim() });
    setTitle('');
    setIsAdding(false);
  };

  return (
<motion.div layout className="w-auto shrink-0 grow-0 flex justify-center items-center">
    {isAdding ? (
        <form ref={ref} onSubmit={handleSubmit} className="p-2 w-full max-w-md">
          <div className="rounded-lg bg-white/50 p-3 backdrop-blur-sm transition-all">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white/80 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter list title..."
              autoFocus
              name="name"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100/80"
              >
                <X size={16} />
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Create List
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="group flex items-center justify-center gap-2 px-4 py-3 w-full max-w-md"
        >
          <Plus size={16} className="transition-transform group-hover:scale-110" />
          Add a list
        </button>
      )}
    </motion.div>
  );
}

export default BoardAddList;
import { useState } from "react";
import { Plus, X } from 'lucide-react';
import useClickOutside from "hooks/useClickOutside.js";

function BoardAddTask({onCreate}) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  
  const ref = useClickOutside(() => setIsAdding(false));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onCreate({ name: title.trim() });
    setTitle('');
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <form 
        ref={ref} 
        onSubmit={handleSubmit} 
        className="rounded-lg bg-white p-3 shadow-sm"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-neutral-grey-200 px-2 py-1 text-sm"
            placeholder="Enter task title..."
            autoFocus
            name="name"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="rounded p-1 hover:bg-neutral-grey-100"
            >
              <X size={14} />
            </button>
            <button
              type="submit"
              className="rounded bg-btn-blue px-2 py-1 text-sm text-white hover:bg-btn-blue/90"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="flex w-full items-center gap-1 rounded-lg border-2 border-white bg-white p-3 text-sm text-black hover:bg-neutral-grey-50"
    >
      <Plus size={14} />
      Add a task
    </button>
  );
}

export default BoardAddTask;
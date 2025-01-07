import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useBoard } from '../../context/BoardContext';

export default function AddCard({ columnId }) {
  const { addCard } = useBoard();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addCard(columnId, {
      id: `card-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString()
    });

    setTitle('');
    setDescription('');
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-neutral-grey-200 px-2 py-1 text-sm"
            placeholder="Enter card title..."
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-neutral-grey-200 px-2 py-1 text-sm"
            placeholder="Enter card description..."
            rows={3}
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
              Add Card
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="flex w-full items-center gap-1 rounded-lg border-2 border-dashed border-neutral-grey-300 p-3 text-sm text-neutral-grey-600 hover:bg-neutral-grey-50"
    >
      <Plus size={14} />
      Add a card
    </button>
  );
}
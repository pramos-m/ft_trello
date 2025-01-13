import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useBoard from "../../hooks/useBoard.js";

const MAX_VISIBLE_CHARS = 383;

export default function Card({ card, columnId, index, setDraggingCard }) {
  const { updateCard } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleDragStart = (e) => {
    e.stopPropagation();
    setDraggingCard(card);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add('dragging-card');
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    setDraggingCard(null);
    setIsDragging(false);
    e.target.classList.remove('dragging-card');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsEditing(false);
        if (title !== card.title || description !== card.description) {
          updateCard(columnId, card.id, { title, description });
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description, columnId, card.id, updateCard, card.title, card.description]);

  const getTruncatedDescription = (text) => {
    if (!text || text.length <= MAX_VISIBLE_CHARS) return text;
    return text.substring(0, MAX_VISIBLE_CHARS) + '...';
  };

  return (
    <motion.div
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`card rounded-lg bg-white p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        transition: 'opacity 0.2s'
      }}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-neutral-300 px-2 py-1 text-sm"
            placeholder="Enter title..."
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-neutral-300 px-2 py-1 text-sm resize-vertical"
            placeholder="Enter description..."
            rows={3}
          />
        </div>
      ) : (
        <>
          <h4 className="text-sm font-medium text-neutral-900 break-words">
            {title}
          </h4>
          {description && (
            <p className="mt-2 text-sm text-neutral-600 break-words">
              {getTruncatedDescription(description)}
            </p>
          )}
        </>
      )}
    </motion.div>
  );
}

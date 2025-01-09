import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBoard } from "../../context/BoardContext";
import { Clock, Dumbbell } from "lucide-react";

const MAX_VISIBLE_CHARS = 383;

const effortLevels = [
  { name: 'None', symbols: [] },
  { 
    name: 'Low', 
    symbols: [<Dumbbell key="1" size={20} className="text-gray-600" />]
  },
  { 
    name: 'Medium', 
    symbols: [
      <Dumbbell key="1" size={20} className="text-gray-600" />,
      <Dumbbell key="2" size={20} className="text-gray-600" />
    ]
  },
  { 
    name: 'High', 
    symbols: [
      <Dumbbell key="1" size={20} className="text-gray-600" />,
      <Dumbbell key="2" size={20} className="text-gray-600" />,
      <Dumbbell key="3" size={20} className="text-gray-600" />
    ]
  }
];

const priorityLevels = [
  { name: 'Low', symbols: [<Clock key="1" size={20} className="text-green-600" />] },
  { name: 'Medium', symbols: [<Clock key="1" size={20} className="text-yellow-600" />] },
  { name: 'High', symbols: [<Clock key="1" size={20} className="text-red-600" />] },
];

export default function Card({ card, columnId, index, setDraggingCard }) {
  const { updateCard } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [isDragging, setIsDragging] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [effort, setEffort] = useState(card.effort || 'Low');
  const [priority, setPriority] = useState(card.priority || 'Low');
  
  const cardRef = useRef(null);
  const menuRef = useRef(null);

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

  const handleEffortChange = (level) => {
    setEffort(level);
    updateCard(columnId, card.id, { ...card, effort: level });
    setOpenMenu(null);
  };

  const handlePriorityChange = (level) => {
    setPriority(level);
    updateCard(columnId, card.id, { ...card, priority: level });
    setOpenMenu(null);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsEditing(false);
        if (title !== card.title || description !== card.description) {
          updateCard(columnId, card.id, { 
            title, 
            description, 
            effort: effort || 'Low',
            priority: priority || 'Low'
          });
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description, effort, priority, columnId, card.id, updateCard, card.title, card.description]);

  const getTruncatedDescription = (text) => {
    if (!text || text.length <= MAX_VISIBLE_CHARS) return text;
    return text.substring(0, MAX_VISIBLE_CHARS) + '...';
  };

  const currentEffort = effortLevels.find(level => level.name === effort) || effortLevels[0];
  const currentPriority = priorityLevels.find(level => level.name === priority) || priorityLevels[0];

  return (
    <motion.div
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`card rounded-lg bg-white p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ transition: 'opacity 0.2s' }}
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
        <div onClick={(e) => {
          e.stopPropagation();
          if (!openMenu) setIsEditing(true);
        }}>
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-medium text-neutral-900 break-words">
              {title}
            </h4>
            <div className="flex items-center space-x-1 ml-2" ref={menuRef}>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === 'effort' ? null : 'effort');
                  }}
                  className="flex items-center hover:bg-gray-50 p-1 rounded"
                >
                  {currentEffort?.symbols}
                </button>
                <AnimatePresence>
                  {openMenu === 'effort' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                    >
                      {effortLevels.map((level) => (
                        <button
                          key={level.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEffortChange(level.name);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                        >
                          <div className="flex gap-1">{level.symbols}</div>
                          <span className="text-sm">{level.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === 'priority' ? null : 'priority');
                  }}
                  className="flex items-center hover:bg-gray-50 p-1 rounded"
                >
                  {currentPriority?.symbols}
                </button>
                <AnimatePresence>
                  {openMenu === 'priority' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                    >
                      {priorityLevels.map((level) => (
                        <button
                          key={level.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePriorityChange(level.name);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50"
                        >
                          <div className="flex gap-1">{level.symbols}</div>
                          <span className="text-sm">{level.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {description && (
            <p className="mt-2 text-sm text-neutral-600 break-words">
              {getTruncatedDescription(description)}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
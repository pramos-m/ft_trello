/*estructura de la card como antes.*/
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBoard } from "../../context/BoardContext";
import { Clock, X } from "lucide-react";

const MAX_VISIBLE_CHARS = 383;

const effortLevels = [
  { name: 'None', symbols: [] },
  { 
    name: 'Low', 
    symbols: [
      <img 
        key="1"
        src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
        alt="Low effort" 
        width="20" 
        height="20" 
        className="inline-block"
      />
    ] 
  },
  { 
    name: 'Medium', 
    symbols: [
      <img 
        key="1"
        src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
        alt="Medium effort" 
        width="20" 
        height="20"
        className="inline-block mr-0.5"
      />,
      <img 
        key="2"
        src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
        alt="Medium effort" 
        width="20" 
        height="20"
        className="inline-block"
      />
    ] 
  },
  { 
    name: 'High', 
    symbols: [
      <img 
        key="1"
        src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
        alt="High effort" 
        width="20" 
        height="20"
        className="inline-block mr-0.5"
      />,
      <img 
        key="2"
        src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
        alt="High effort" 
        width="20" 
        height="20"
        className="inline-block mr-0.5"
      />,
      <img 
        key="3"
        src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
        alt="High effort" 
        width="20" 
        height="20"
        className="inline-block"
      />
    ] 
  }
];
const priorityLevels = [
  { name: 'None', symbols: [] },
  { name: 'Low', symbols: [<Clock key="1" size={20} className="text-green-600" />] },
  { name: 'Medium', symbols: [<Clock key="1" size={20} className="text-yellow-600" />] },
  { name: 'High', symbols: [<Clock key="1" size={20} className="text-red-600" />] },
];

// Sample labels - in production these would come from your global state
const availableLabels = [
  { id: 'blog', name: 'Blog', color: 'bg-green-100 text-green-800' },
  { id: 'frontend', name: 'Frontend', color: 'bg-pink-100 text-pink-800' },
  { id: 'devops', name: 'DevOp', color: 'bg-purple-100 text-purple-800' },
];

// Predefined colors for new labels
const labelColors = [
  'bg-green-100 text-green-800',
  'bg-pink-100 text-pink-800',
  'bg-purple-100 text-purple-800',
  'bg-blue-100 text-blue-800',
  'bg-yellow-100 text-yellow-800'
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
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(card.labels || []);
  const [labelSearchTerm, setLabelSearchTerm] = useState('');
  const [labelInput, setLabelInput] = useState('');

  const cardRef = useRef(null);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  
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

  const handleLabelSelect = (label) => {
    const newLabels = selectedLabels.includes(label.id)
      ? selectedLabels.filter(id => id !== label.id)
      : [...selectedLabels, label.id];
    
    setSelectedLabels(newLabels);
    updateCard(columnId, card.id, { ...card, labels: newLabels });
    setLabelInput('');
  };

  const handleCreateLabel = () => {
    if (labelInput.trim()) {
      const newLabel = {
        id: labelInput.toLowerCase().replace(/\s+/g, '-'),
        name: labelInput.trim(),
        color: labelColors[Math.floor(Math.random() * labelColors.length)]
      };
      
      // In production, you would update this in your global state
      availableLabels.push(newLabel);
      
      handleLabelSelect(newLabel);
      setLabelInput('');
    }
  };

  const handleRemoveLabel = (labelId, e) => {
    e.stopPropagation();
    const newLabels = selectedLabels.filter(id => id !== labelId);
    setSelectedLabels(newLabels);
    updateCard(columnId, card.id, { ...card, labels: newLabels });
  };

  const filteredLabels = labelInput
    ? availableLabels.filter(label => 
        label.name.toLowerCase().includes(labelInput.toLowerCase())
      )
    : [];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
        setShowLabelInput(false);
      }
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsEditing(false);
        if (title !== card.title || description !== card.description) {
          updateCard(columnId, card.id, { 
            ...card,
            title, 
            description,
          });
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description, columnId, card, updateCard]);

  const getTruncatedDescription = (text) => {
    if (!text || text.length <= MAX_VISIBLE_CHARS) return text;
    return text.substring(0, MAX_VISIBLE_CHARS) + '...';
  };

  const currentEffort = effortLevels.find(level => level.name === effort) || effortLevels[0];
  const currentPriority = priorityLevels.find(level => level.name === priority) || priorityLevels[0];

  return (
    <motion.div
      ref={cardRef}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`card rounded-lg bg-white shadow-sm hover:shadow-md transition-all
        ${isEditing ? 'p-4' : 'p-3'} 
        ${isDragging ? 'opacity-0' : 'opacity-100'}
        ${!isEditing ? 'cursor-grab active:cursor-grabbing' : ''}`}
      onClick={(e) => {
        if (!isEditing && !openMenu) {
          e.stopPropagation();
          setIsEditing(true);
        }
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Labels Section */}
        <div className="flex flex-wrap gap-1.5">
          {selectedLabels.map(labelId => {
            const label = availableLabels.find(l => l.id === labelId);
            if (!label) return null;
            return (
              <span
                key={label.id}
                className={`px-2 py-1 rounded-full text-xs font-medium ${label.color} flex items-center gap-1`}
              >
                {label.name}
                {isEditing && (
                  <button
                    onClick={(e) => handleRemoveLabel(label.id, e)}
                    className="hover:bg-black/10 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </span>
            );
          })}
          {isEditing && (
            <div className="relative" ref={menuRef}>
              {!showLabelInput ? (
                <button
                  onClick={() => {
                    setShowLabelInput(true);
                    setTimeout(() => inputRef.current?.focus(), 0);
                  }}
                  className="px-2 py-1 rounded text-xs text-gray-700 hover:bg-gray-100"
                >
                  + Add label
                </button>
              ) : (
                <div className="absolute left-0 top-0 z-10 w-64 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="p-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={labelInput}
                      onChange={(e) => setLabelInput(e.target.value)}
                      placeholder="Selecciona una opción o crea una"
                      className="w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {labelInput && (
                    <div className="px-2 pb-2">
                      <button
                        onClick={handleCreateLabel}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                      >
                        Create "{labelInput}"
                      </button>
                    </div>
                  )}

                  {filteredLabels.length > 0 && (
                    <div className="max-h-48 overflow-y-auto border-t">
                      {filteredLabels.map(label => (
                        <button
                          key={label.id}
                          onClick={() => handleLabelSelect(label)}
                          className="w-full flex items-center px-3 py-2 hover:bg-gray-50"
                        >
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${label.color}`}>
                            {label.name}
                          </span>
                          {selectedLabels.includes(label.id) && (
                            <span className="ml-auto text-blue-600">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Title and Controls */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border border-neutral-300 px-3 py-1.5 text-sm"
                placeholder="Enter title..."
                autoFocus
              />
            ) : (
              <h4 className="text-sm font-medium text-neutral-900 break-words">
                {title}
              </h4>
            )}
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0" ref={menuRef}>
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === 'effort' ? null : 'effort');
                }}
                className="flex items-center hover:bg-gray-50 p-1.5 rounded min-w-[28px] justify-center"
              >
                {currentEffort?.symbols}
              </button>
              <AnimatePresence>
                {openMenu === 'effort' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]"
                  >
                    {effortLevels.map((level) => (
                      <button
                        key={level.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEffortChange(level.name);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-50"
                      >
                        <div className="flex gap-0.5 min-w-[60px] items-center">
                          {level.symbols}
                        </div>
                        <span className="text-sm text-gray-700">{level.name}</span>
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
                className="flex items-center hover:bg-gray-50 p-1.5 rounded min-w-[28px] justify-center"
              >
                {currentPriority?.symbols}
              </button>
              <AnimatePresence>
                {openMenu === 'priority' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[120px]"
                  >
                    {priorityLevels.map((level) => (
                      <button
                        key={level.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePriorityChange(level.name);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-gray-50"
                      >
                        <div className="flex gap-0.5 min-w-[60px] items-center">
                          {level.symbols}
                        </div>
                        <span className="text-sm text-gray-700">{level.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Description */}
        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm min-h-[80px] resize-none"
            placeholder="Enter description..."
            rows={3}
          />
        ) : (
          description && (
            <p className="text-sm text-neutral-600 break-words">
              {getTruncatedDescription(description)}
            </p>
          )
        )}
      </div>
    </motion.div>
  );
}
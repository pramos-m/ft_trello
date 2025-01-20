import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBoard } from "../../context/BoardContext";
import { Clock, X, MoreHorizontal, Trash2, Check } from "lucide-react";
import { useLabelManager, LabelDisplay } from './LabelManager';
import { LabelMenu } from './LabelMenu';

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

  const {
    selectedLabels,
    availableLabels,
    handleLabelSelect,
    handleDeleteLabel,
    handleColorChange
  } = useLabelManager(['blog', 'frontend']); // Pass initial labels

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

  const handleSaveCard = () => {
    setIsEditing(false);
    if (title !== card.title || description !== card.description) {
      updateCard(columnId, card.id, { 
        ...card,
        title, 
        description,
      });
    }
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
      // Si hay algún menú de labels abierto, dejamos que su propio handler lo maneje
      if (showLabelInput && (
        menuRef.current?.contains(event.target) ||
        event.target.closest('[data-label-menu="true"]')
      )) {
        return;
      }

      // Si el click es dentro de la card pero fuera de los menús
      if (cardRef.current?.contains(event.target)) {
        if (openMenu) {
          setOpenMenu(null);
        }
        return;
      }

      // Si el click es completamente fuera de la card
      if (!cardRef.current?.contains(event.target)) {
        // Primero cerramos los menús si están abiertos
        if (openMenu) {
          setOpenMenu(null);
        }
        if (showLabelInput) {
          setShowLabelInput(false);
        }
        // Si no hay menús abiertos, guardamos y cerramos la card
        else if (isEditing) {
          handleSaveCard();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLabelInput, openMenu, isEditing, title, description]);

  const handleCardClick = (e) => {
    // Si el click es en la card pero no en ningún menú
    if (!e.target.closest('[data-label-menu="true"]')) {
      if (!openMenu && !showLabelInput) {
        setIsEditing(true);
      }
    }
  };
  
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
      className={`relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 
        ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      onClick={handleCardClick}
    >
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3" onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 text-base rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add title..."
                autoFocus
              />
              <div className="flex items-center gap-2 flex-shrink-0" ref={menuRef}>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === 'effort' ? null : 'effort');
                    }}
                    className="flex items-center hover:bg-gray-50 p-1 rounded-lg"
                  >
                    {currentEffort.symbols}
                  </button>
                  
                  <AnimatePresence>
                    {openMenu === 'effort' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[160px]"
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
                    className="flex items-center hover:bg-gray-50 p-1 rounded-lg"
                  >
                    {currentPriority.symbols}
                  </button>
                  
                  <AnimatePresence>
                    {openMenu === 'priority' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[160px]"
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

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
              placeholder="Add description..."
            />
            
            <LabelDisplay 
              selectedLabels={selectedLabels}
              availableLabels={availableLabels}
              onEditClick={() => setShowLabelInput(true)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <h3 className="text-base font-medium text-gray-900 min-w-0 flex-1 break-words">{title}</h3>
              <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                {currentEffort.symbols}
                {currentPriority.symbols}
              </div>
            </div>
            
            {description && (
              <p className="text-sm text-gray-600 break-words overflow-hidden">
                {getTruncatedDescription(description)}
              </p>
            )}
            
            <LabelDisplay 
              selectedLabels={selectedLabels}
              availableLabels={availableLabels}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {showLabelInput && (
          <div className="absolute left-full top-0 ml-2">
            <LabelMenu
              isOpen={showLabelInput}
              onClose={() => setShowLabelInput(false)}
              selectedLabels={selectedLabels}
              onLabelSelect={handleLabelSelect}
              availableLabels={availableLabels}
              onDeleteLabel={handleDeleteLabel}
              onColorChange={handleColorChange}
            />
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBoard } from "../../context/BoardContext";
import { Clock, X, MoreHorizontal, Trash2, Check } from "lucide-react";

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

const LabelMenu = ({ isOpen, onClose, selectedLabels, onLabelSelect, availableLabels, onDeleteLabel, onColorChange }) => {
  const [labelInput, setLabelInput] = useState("");
  const [activeLabel, setActiveLabel] = useState(null);
  const [editingName, setEditingName] = useState("");
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) 
      ) {
        onClose();
      } else if (
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target) &&
        menuRef.current.contains(event.target) 
      ) {
        setActiveLabel(null); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (activeLabel) {
      const label = availableLabels.find(l => l.id === activeLabel);
      if (label) {
        setEditingName(label.name);
      }
    }
  }, [activeLabel, availableLabels]);

  const handleNameChange = (e) => {
    setEditingName(e.target.value);
  };

  const handleNameBlur = () => {
    if (activeLabel && editingName.trim()) {
      const updatedLabels = availableLabels.map(label =>
        label.id === activeLabel 
          ? { ...label, name: editingName.trim() } 
          : label
      );
      const updatedLabel = updatedLabels.find(l => l.id === activeLabel);
      onColorChange(activeLabel, updatedLabel.color, editingName.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const handleCreateLabel = () => {
    if (labelInput.trim()) {
      const newLabel = {
        id: labelInput.toLowerCase().replace(/\s+/g, '-'),
        name: labelInput.trim(),
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)].bgLight
      };
      onLabelSelect(newLabel);
      setLabelInput('');
    }
  };

  const colorOptions = [
    { name: 'Rojo', bgColor: 'bg-red-500', textColor: 'text-red-800', bgLight: 'bg-red-100' },
    { name: 'Rosa', bgColor: 'bg-pink-500', textColor: 'text-pink-800', bgLight: 'bg-pink-100' },
    { name: 'Rosa Claro', bgColor: 'bg-rose-500', textColor: 'text-rose-800', bgLight: 'bg-rose-100' },
    { name: 'Fucsia', bgColor: 'bg-fuchsia-500', textColor: 'text-fuchsia-800', bgLight: 'bg-fuchsia-100' },
    { name: 'Naranja', bgColor: 'bg-orange-500', textColor: 'text-orange-800', bgLight: 'bg-orange-100' },
    { name: 'Ámbar', bgColor: 'bg-amber-500', textColor: 'text-amber-800', bgLight: 'bg-amber-100' },
    { name: 'Amarillo', bgColor: 'bg-yellow-500', textColor: 'text-yellow-800', bgLight: 'bg-yellow-100' },
    { name: 'Lima', bgColor: 'bg-lime-500', textColor: 'text-lime-800', bgLight: 'bg-lime-100' },
    { name: 'Verde', bgColor: 'bg-green-500', textColor: 'text-green-800', bgLight: 'bg-green-100' },
    { name: 'Esmeralda', bgColor: 'bg-emerald-500', textColor: 'text-emerald-800', bgLight: 'bg-emerald-100' },
    { name: 'Cian', bgColor: 'bg-cyan-500', textColor: 'text-cyan-800', bgLight: 'bg-cyan-100' },
    { name: 'Azul', bgColor: 'bg-blue-500', textColor: 'text-blue-800', bgLight: 'bg-blue-100' },
    { name: 'Índigo', bgColor: 'bg-indigo-500', textColor: 'text-indigo-800', bgLight: 'bg-indigo-100' },
    { name: 'Violeta', bgColor: 'bg-violet-500', textColor: 'text-violet-800', bgLight: 'bg-violet-100' },
    { name: 'Púrpura', bgColor: 'bg-purple-500', textColor: 'text-purple-800', bgLight: 'bg-purple-100' },
    { name: 'Negro', bgColor: 'bg-gray-900', textColor: 'text-gray-800', bgLight: 'bg-gray-100' }
  ];
  
  const filteredLabels = availableLabels.filter(label =>
    label.name.toLowerCase().includes(labelInput.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute left-0 top-0 z-50 bg-white rounded-3xl shadow-lg border border-gray-200 w-72"
        >
          <div className="p-4 space-y-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedLabels.map(labelId => {
                const label = availableLabels.find(l => l.id === labelId);
                if (!label) return null;
                return (
                  <div key={label.id} className={`flex items-center rounded-full px-3 py-1.5 shadow-sm ${label.color}`}>
                    <span className="text-sm">{label.name}</span>
                    <button 
                      onClick={() => onLabelSelect(label)}
                      className="ml-2"
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </button>
                  </div>
                );
              })}
            </div>

            <input
              type="text"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              placeholder="Selecciona una opción o crea una"
              className="w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreateLabel();
                }
              }}
            />

            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredLabels.map(label => (
                <div
                  key={label.id}
                  className="flex items-center justify-between group px-3 py-2 hover:bg-gray-50 rounded-xl"
                >
                  <button
                    onClick={() => onLabelSelect(label)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <span className={`px-3 py-1 rounded-full text-sm ${label.color}`}>
                      {label.name}
                    </span>
                    {selectedLabels.includes(label.id) && (
                      <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveLabel(activeLabel === label.id ? null : label.id)}
                    className="p-1 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal size={16} />
                  </button>

                  <AnimatePresence>
                    {activeLabel === label.id && (
                      <motion.div
                        ref={subMenuRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 min-w-[200px] z-10"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <input
                            type="text"
                            value={editingName}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            onKeyPress={handleKeyPress}
                            className="font-medium bg-transparent outline-none focus:border-b border-gray-200"
                            autoFocus
                          />
                          <button onClick={() => onDeleteLabel(label)}>
                            <Trash2 size={16} className="text-gray-400" />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-gray-500">Colores</span>
                          <div className="grid grid-cols-4 gap-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color.name}
                                onClick={() => onColorChange(label.id, `${color.bgLight} ${color.textColor}`)}
                                className="relative w-8 h-8 rounded-full flex items-center justify-center"
                              >
                                <div className={`w-6 h-6 rounded-full ${color.bgColor}`} />
                                {label.color.includes(color.bgLight) && (
                                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                    <Check size={12} className="text-black" />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            {labelInput && !filteredLabels.some(label => label.name.toLowerCase() === labelInput.toLowerCase()) && (
              <div className="px-2 pb-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCreateLabel();
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
                >
                  Crear "{labelInput}"
                </button>
              </div>
            )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [selectedLabels, setSelectedLabels] = useState(['blog', 'frontend']);
  const [availableLabels, setAvailableLabels] = useState([
    { id: 'blog', name: 'Blog', color: 'bg-green-100 text-green-800' },
    { id: 'frontend', name: 'Frontend', color: 'bg-pink-100 text-pink-800' },
    { id: 'backend', name: 'Backend', color: 'bg-yellow-100 text-yellow-800' },
  ]);
  

  const cardRef = useRef(null);
  const menuRef = useRef(null);


  const handleLabelSelect = (label) => {
    if (!availableLabels.find(l => l.id === label.id)) {
      setAvailableLabels(prev => [...prev, label]);
    }
    
    setSelectedLabels(prev => 
      prev.includes(label.id) 
        ? prev.filter(id => id !== label.id)
        : [...prev, label.id]
    );
  };
  const handleDeleteLabel = (labelToDelete) => {
    setAvailableLabels(prev => prev.filter(label => label.id !== labelToDelete.id));
    setSelectedLabels(prev => prev.filter(id => id !== labelToDelete.id));
  };

  const handleColorChange = (labelId, newColor, newName = null) => {
    setAvailableLabels(prevLabels => 
      prevLabels.map(label => 
        label.id === labelId 
          ? { 
              ...label, 
              color: newColor,
              ...(newName ? { name: newName } : {})
            } 
          : label
      )
    );
  };

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
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        handleSaveCard();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description]);

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
      onClick={() => !openMenu && setIsEditing(true)}
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
            
            <div className="flex flex-wrap gap-2">
              {selectedLabels.map(labelId => {
                const label = availableLabels.find(l => l.id === labelId);
                if (!label) return null;
                return (
                  <span key={label.id} 
                    className={`px-3 py-1 rounded-full text-sm ${label.color} break-words`}>
                    {label.name}
                  </span>
                );
              })}
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowLabelInput(true);
                }}
                className="px-3 py-1 rounded-full text-sm text-gray-600 hover:bg-gray-50"
              >
                + Edit labels
              </button>
            </div>
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
            
            <div className="flex flex-wrap gap-2">
              {selectedLabels.map(labelId => {
                const label = availableLabels.find(l => l.id === labelId);
                if (!label) return null;
                return (
                  <span key={label.id} 
                    className={`px-3 py-1 rounded-full text-sm ${label.color} break-words`}>
                    {label.name}
                  </span>
                );
              })}
            </div>
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
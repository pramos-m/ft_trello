import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, Palette } from "lucide-react";

const MAX_VISIBLE_CHARS = 383;

const effortLevels = [
  { name: 'None', symbols: [] },
  { 
    name: 'Low', 
    symbols: [
      <img 
        key="1"
        src="/api/placeholder/20/20"
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
        src="/api/placeholder/20/20"
        alt="Medium effort" 
        width="20" 
        height="20"
        className="inline-block mr-0.5"
      />,
      <img 
        key="2"
        src="/api/placeholder/20/20"
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
        src="/api/placeholder/20/20"
        alt="High effort" 
        width="20" 
        height="20"
        className="inline-block mr-0.5"
      />,
      <img 
        key="2"
        src="/api/placeholder/20/20"
        alt="High effort" 
        width="20" 
        height="20"
        className="inline-block mr-0.5"
      />,
      <img 
        key="3"
        src="/api/placeholder/20/20"
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
  { name: 'Low', symbols: [<Clock key="1" className="text-green-600" size={20} />] },
  { name: 'Medium', symbols: [<Clock key="1" className="text-yellow-600" size={20} />] },
  { name: 'High', symbols: [<Clock key="1" className="text-red-600" size={20} />] }
];

const labelColorOptions = [
  { name: 'Green', color: 'bg-green-100 text-green-800' },
  { name: 'Pink', color: 'bg-pink-100 text-pink-800' },
  { name: 'Purple', color: 'bg-purple-100 text-purple-800' },
  { name: 'Blue', color: 'bg-blue-100 text-blue-800' },
  { name: 'Yellow', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Red', color: 'bg-red-100 text-red-800' },
  { name: 'Indigo', color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Orange', color: 'bg-orange-100 text-orange-800' }
];

const getTruncatedDescription = (text) => {
  if (text.length <= MAX_VISIBLE_CHARS) return text;
  return text.substring(0, MAX_VISIBLE_CHARS) + '...';
};

export default function Card({ card, columnId, index, setDraggingCard }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card?.title || 'Italia');
  const [description, setDescription] = useState(card?.description || 'Lorem ipsum dolor sit amet...');
  const [isDragging, setIsDragging] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openColorMenu, setOpenColorMenu] = useState(null);
  const [effort, setEffort] = useState(card?.effort || 'Low');
  const [priority, setPriority] = useState(card?.priority || 'Low');
  const [selectedLabels, setSelectedLabels] = useState(card?.labels || ['blog', 'frontend']);
  const [showLabelInput, setShowLabelInput] = useState(false);
  const [labelInput, setLabelInput] = useState('');
  const [labelToEdit, setLabelToEdit] = useState(null);
  const [showLabelsList, setShowLabelsList] = useState(false);
  const [editingLabelName, setEditingLabelName] = useState('');
  const [availableLabels, setAvailableLabels] = useState([
    { id: 'blog', name: 'Blog', color: 'bg-green-100 text-green-800' },
    { id: 'frontend', name: 'Frontend', color: 'bg-pink-100 text-pink-800' },
    { id: 'devops', name: 'DevOp', color: 'bg-purple-100 text-purple-800' },
  ]);
  const handleDeleteLabel = (labelToDelete) => {
    // Elimina la etiqueta completamente del sistema
    setAvailableLabels(prev => prev.filter(label => label.id !== labelToDelete.id));
    setSelectedLabels(prev => prev.filter(id => id !== labelToDelete.id));
  };

  const cardRef = useRef(null);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const colorMenuRef = useRef(null);
  const labelsAreaRef = useRef(null);

  
  const handleDragStart = (e) => {
    setDraggingCard(card);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggingCard(null);
    setIsDragging(false);
  };

  const handleEffortChange = (level) => {
    setEffort(level);
    setOpenMenu(null);
  };

  const handlePriorityChange = (level) => {
    setPriority(level);
    setOpenMenu(null);
  };

  /*const handleColorChange = (labelId, newColor) => {
    setAvailableLabels(prevLabels => 
      prevLabels.map(label => 
        label.id === labelId ? { ...label, color: newColor } : label
      )
    );
    setOpenColorMenu(null);
  };*/

  const LabelMenu = ({ label, onColorChange, onDelete, onEdit }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="relative group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-black/5 rounded-full transition-opacity"
        >
          <MoreHorizontal size={14} />
        </button>
        
        <AnimatePresence>
          {showMenu && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-6 z-50 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <div className="py-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(label);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 size={14} className="mr-2" />
                  Editar nombre
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onColorChange(label);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Palette size={14} className="mr-2" />
                  Cambiar color
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(label);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <Trash2 size={14} className="mr-2" />
                  Eliminar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  

  const handleColorChange = (labelId, newColor) => {
    setAvailableLabels(prevLabels => 
      prevLabels.map(label => 
        label.id === labelId ? { ...label, color: newColor } : label
      )
    );
    setOpenColorMenu(null); // Close the color menu
    setShowLabelInput(true); // Keep the label editing menu open
  };
  
  const handleColorMenuOpen = (e, labelId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLabelInput(true); // Keep the label input visible
    setOpenColorMenu(openColorMenu === labelId ? null : labelId);
  };
    
  const handleLabelSelect = (label) => {
    setSelectedLabels(prev => 
      prev.includes(label.id) 
        ? prev.filter(id => id !== label.id)
        : [...prev, label.id]
    );
    setLabelInput('');
    setShowLabelInput(false);
  };

  const handleCreateLabel = () => {
    if (labelInput.trim()) {
      const newLabel = {
        id: labelInput.toLowerCase().replace(/\s+/g, '-'),
        name: labelInput.trim(),
        color: labelColorOptions[Math.floor(Math.random() * labelColorOptions.length)].color
      };
      setAvailableLabels(prev => [...prev, newLabel]);
      setSelectedLabels(prev => [...prev, newLabel.id]);
      setLabelInput('');
      setShowLabelInput(false);
    }
  };

  const handleRemoveLabel = (labelId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedLabels(prev => prev.filter(id => id !== labelId));
  };

  const filteredLabels = labelInput
    ? availableLabels.filter(label => 
        label.name.toLowerCase().includes(labelInput.toLowerCase())
      )
    : availableLabels;

    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if click is outside the labels area
        if (labelsAreaRef.current && !labelsAreaRef.current.contains(event.target)) {
          setShowLabelInput(false);
          setOpenColorMenu(null);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const ColorMenu = ({ labelId }) => (
      <AnimatePresence>
        {openColorMenu === labelId && (
          <motion.div
            ref={colorMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {labelColorOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleColorChange(labelId, option.color);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-50"
                >
                  <span className={`w-4 h-4 rounded-full mr-3 ${option.color.split(' ')[0]}`} />
                  <span className="text-gray-700">{option.name}</span>
                  {availableLabels.find(l => l.id === labelId)?.color === option.color && (
                    <span className="ml-auto">✓</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );  

  return (
    <motion.div
      ref={cardRef}
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded-xl shadow-sm p-4 space-y-4 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      <div className="flex flex-wrap gap-2 mb-3" ref={labelsAreaRef}>
        {selectedLabels.map(labelId => {
          const label = availableLabels.find(l => l.id === labelId);
          if (!label) return null;
          
          return (
            <div key={label.id} className="relative group">
              <span
                className={`px-3 py-1 rounded-full text-sm ${label.color} flex items-center gap-1`}
                onClick={(e) => e.stopPropagation()}
              >
                {label.name}
                {showLabelInput && (
                  <>
                    <button
                      onClick={(e) => handleColorMenuOpen(e, label.id)}
                      className="hover:bg-black/10 rounded-full p-0.5 ml-1"
                    >
                      <Palette size={12} />
                    </button>
                    <button
                      onClick={(e) => handleRemoveLabel(label.id, e)}
                      className="hover:bg-black/10 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </>
                )}
              </span>
              <ColorMenu labelId={label.id} />
            </div>
          );
        })}

        {isEditing && (
          <div className="relative" ref={menuRef}>
            {!showLabelInput ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenColorMenu(null);
                  setShowLabelInput(true);
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}
                className="px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                + Edit Labels
              </button>
            ) : (
              <div 
                className="absolute left-0 top-0 z-10 w-64 bg-white rounded-lg shadow-lg border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={labelInput}
                    onChange={(e) => setLabelInput(e.target.value)}
                    placeholder="Select an option or create new"
                    className="w-full px-2 py-1.5 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {labelInput && (
                  <div className="px-2 pb-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCreateLabel();
                      }}
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
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLabelSelect(label);
                        }}
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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === 'effort' ? null : 'effort');
                }}
                className="flex items-center space-x-0.5"
              >
                {effortLevels.find(level => level.name === effort)?.symbols}
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
                          handleMenuChange('effort', level.name);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50"
                      >
                        <div className="flex gap-0.5">
                          {level.symbols}
                        </div>
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
              >
                {priorityLevels.find(level => level.name === priority)?.symbols}
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
                          handleMenuChange('priority', level.name);
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

        <div className="mt-4">
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter description..."
              rows={3}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            description && (
              <p className="text-sm text-neutral-600 break-words">
                {getTruncatedDescription(description)}
              </p>
            )
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(false);
              }}
              className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
// menú similar a nivel de label
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, Palette, Trash2, MoreHorizontal, Edit2 } from "lucide-react";

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

const LabelActionMenu = ({ label, onDelete, onColorChange, onRename }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="absolute right-0 mt-1 z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48"
  >
    <button
      onClick={() => onRename(label)}
      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      <Edit2 size={14} className="mr-2" />
      Rename
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onColorChange(label.id);
      }}
      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      <Palette size={14} className="mr-2" />
      Change color
    </button>
    <button
      onClick={() => onDelete(label)}
      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
    >
      <Trash2 size={14} className="mr-2" />
      Delete
    </button>
  </motion.div>
);


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
  const [availableLabels, setAvailableLabels] = useState([
    { id: 'blog', name: 'Blog', color: 'bg-green-100 text-green-800' },
    { id: 'frontend', name: 'Frontend', color: 'bg-pink-100 text-pink-800' },
    { id: 'devops', name: 'DevOp', color: 'bg-purple-100 text-purple-800' },
  ]);

  const cardRef = useRef(null);
  const menuRef = useRef(null); //poner
  const inputRef = useRef(null);
  const colorMenuRef = useRef(null); //poner
  const labelsAreaRef = useRef(null);

  const handleDragStart = (e) => {
    setDraggingCard(card);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setDraggingCard(null);
    setIsDragging(false);
  };

  const getFilteredLabels = () => {
    return availableLabels.filter(label =>
      label.name.toLowerCase().includes(labelInput.toLowerCase())
    );
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

  const handleMenuChange = (menuType, value) => {
    if (menuType === 'effort') {
      setEffort(value);
    } else if (menuType === 'priority') {
      setPriority(value);
    }
    setOpenMenu(null);
  };

  const handleLabelSelect = (label) => {
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
  
  const handleColorChange = (labelId, newColor) => {
    setAvailableLabels(prevLabels => 
      prevLabels.map(label => 
        label.id === labelId ? { ...label, color: newColor } : label
      )
    );
    setOpenColorMenu(null);
  };

  const handleRemoveLabel = (labelId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedLabels(prev => prev.filter(id => id !== labelId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (labelsAreaRef.current && !labelsAreaRef.current.contains(event.target)) {
        setShowLabelInput(false);
        setOpenColorMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ColorMenu = ({ labelId }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48"
    >
      <div className="space-y-1">
        <h3 className="px-3 py-1 text-sm font-medium">Colores</h3>
        <div className="space-y-1">
          {[
              { name: 'Green', value: 'bg-green-100 text-green-800' },
              { name: 'Pink', value: 'bg-pink-100 text-pink-800' },
              { name: 'Purple', value: 'bg-purple-100 text-purple-800' },
              { name: 'Blue', value: 'bg-blue-100 text-blue-800' },
              { name: 'Yellow', value: 'bg-yellow-100 text-yellow-800' },
              { name: 'Red', value: 'bg-red-100 text-red-800' },
              { name: 'Indigo', value: 'bg-indigo-100 text-indigo-800' },
              { name: 'Orange', value: 'bg-orange-100 text-orange-800' }            
          ].map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorChange(labelId, color.value)}
              className="flex items-center w-full px-3 py-1 hover:bg-gray-50"
            >
              <span className={`w-4 h-4 rounded-full mr-3 ${color.value.split(' ')[0]}`} />
              <span className="text-sm text-gray-700">{color.name}</span>
              {availableLabels.find(l => l.id === labelId)?.color === color.value && (
                <span className="ml-auto">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
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
              <button
                className={`px-3 py-1 rounded-full text-sm ${label.color} flex items-center gap-1`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLabelInput(true);
                  setOpenColorMenu(null);
                }}
              >
                {label.name}
                {showLabelInput && (
                  <X 
                    size={14}
                    className="ml-1 hover:bg-black/10 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveLabel(label.id);
                    }}
                  />
                )}
              </button>
            </div>
          );
        })}

        {isEditing && (
          <div className="relative">
        {!showLabelInput ? (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowLabelInput(true);
        }}
        className="px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100"
      >
        + Edit labels
      </button>
    ) : (
      <div 
        className="absolute left-0 top-0 z-50 w-72 bg-white rounded-lg shadow-lg border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
            placeholder="Selecciona una opción o crea una"
            className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="max-h-64 overflow-y-auto space-y-1">
          {getFilteredLabels().map(label => (
              <div
                key={label.id}
                className="flex items-center justify-between group px-2 py-1.5 hover:bg-gray-50 rounded-md"
              >
                <button
                  onClick={() => handleLabelSelect(label)}
                  className="flex items-center gap-2 flex-1"
                >
                  <span className={`px-2 py-1 rounded-full text-sm ${label.color}`}>
                    {label.name}
                  </span>
                  {selectedLabels.includes(label.id) && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </button>
                <div className="opacity-0 group-hover:opacity-100 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === label.id ? null : label.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                <AnimatePresence>
                  {openMenu === label.id && (
                    <div className="absolute right-8">
                      <LabelActionMenu
                        label={label}
                        onDelete={handleDeleteLabel}
                        onColorChange={() => setOpenColorMenu(label.id)}
                        onRename={(label) => {
                          // Add rename functionality here
                          console.log('Rename label:', label);
                        }}
                      />
                    </div>
                  )}
                  {openColorMenu === label.id && (
                    <div className="absolute right-8">
                      <ColorMenu labelId={label.id} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
))}

          </div>
          {labelInput && getFilteredLabels().length === 0 && (
            <button
              onClick={handleCreateLabel}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
            >
              Crear "{labelInput}"
            </button>
          )}
        </div>
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
  
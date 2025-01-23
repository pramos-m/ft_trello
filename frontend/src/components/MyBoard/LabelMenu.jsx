import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MoreHorizontal, Trash2, Check } from "lucide-react";

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

export const LabelMenu = ({ 
  isOpen, 
  onClose, 
  selectedLabels, 
  onLabelSelect, 
  availableLabels, 
  onDeleteLabel, 
  onColorChange 
}) => {
  const [labelInput, setLabelInput] = useState("");
  const [activeLabel, setActiveLabel] = useState(null);
  const [editingName, setEditingName] = useState("");
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      event.stopPropagation();
      
      const clickedInSubmenu = subMenuRef.current?.contains(event.target);
      const clickedInMainMenu = menuRef.current?.contains(event.target);
      
      if (activeLabel) {
        if (!clickedInSubmenu && clickedInMainMenu) {
          setActiveLabel(null);
          return;
        }
        if (!clickedInSubmenu && !clickedInMainMenu) {
          setActiveLabel(null);
          return;
        }
      } else {
        if (!clickedInMainMenu) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, activeLabel]);

  useEffect(() => {
    if (activeLabel) {
      const label = availableLabels.find(l => l.id === activeLabel);
      if (label) {
        setEditingName(label.name);
      }
    }
  }, [activeLabel, availableLabels]);

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
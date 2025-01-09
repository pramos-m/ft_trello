import { useState } from 'react';
import { ChevronDown, ChevronLeft, Paperclip, Filter, Clock, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarMenu = ({ onClose }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [selectedColor, setSelectedColor] = useState('violeta');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

 const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedEffort.name !== 'None') count++;
    if (selectedPriority.name !== 'None') count++;
    return count;
  };

  const colors = [
    { name: 'Rojo', color: '#E74C3C' },
    { name: 'Naranja', color: '#F39C12' },
    { name: 'Verde', color: '#27AE60' },
    { name: 'Cian', color: '#3498DB' },
    { name: 'Azul', color: '#2563EB' },
    { name: 'Violeta', color: '#6B46C1' },
    { name: 'Negro', color: '#1E293B' }
  ];

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
          className="inline-block"
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
          className="inline-block"
        />,
        <img 
          key="2"
          src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
          alt="High effort" 
          width="20" 
          height="20"
          className="inline-block"
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
    { name: 'Low', symbols: [<Clock key="1" size={20} className="text-green-600" />] },
    { name: 'Medium', symbols: [<Clock key="1" size={20} className="text-yellow-600" />] },
    { name: 'High', symbols: [<Clock key="1" size={20} className="text-red-600" />] },
  ];
    
  const [selectedEffort, setSelectedEffort] = useState(effortLevels[0]);
  const [selectedPriority, setSelectedPriority] = useState(priorityLevels[0]);

  return (
    <div className="p-6 space-y-6 bg-white h-full relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xl font-medium text-neutral-grey-800 hover:bg-gray-50 rounded px-2 py-1"
        >
          <ChevronLeft size={20} />
          Mallorca
        </button>
      </div>

      {/* Tasks Section */}
      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2.5">
          <Paperclip size={16} className="text-gray-700" />
          <span className="text-sm text-gray-900 font-medium">Tasks</span>
        </div>
        <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">6</span>
      </div>

      {/* Background Section */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('background')}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
        >
          <div className="flex items-center gap-2.5">
            <Palette size={16} className="text-gray-700" />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">Background</span>
          </div>
        </button>

        <AnimatePresence>
          {openMenu === 'background' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 py-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
            >
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color.name.toLowerCase());
                    toggleMenu('background');
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-gray-50"
                >
                  <span
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-gray-700">{color.name}</span>
                  {selectedColor === color.name.toLowerCase() && (
                    <span className="ml-auto">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filters Section */}
      <div className="space-y-2">
        <button
          onClick={() => toggleMenu('filters')}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group"
        >
          <div className="flex items-center gap-2.5">
            <Filter size={16} className="text-gray-700" />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">Filters</span>
          </div>
          <div className="flex items-center gap-2">
            {getActiveFiltersCount() > 0 && (
              <span className="bg-gray-100 text-xs text-gray-700 px-2 py-0.5 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${
                openMenu === 'filters' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        <AnimatePresence>
          {openMenu === 'filters' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-8 space-y-1 overflow-hidden"
            >
              {/* Effort */}
              <div>
                <button
                  onClick={() => toggleSubMenu('effort')}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="https://img.icons8.com/?size=100&id=YNm4lzVFByuZ&format=png&color=000000" 
                      alt="Effort icon"
                      width="20"
                      height="20"
                      className="text-gray-700"
                    />
                    <span className="text-sm text-gray-700">Effort</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {selectedEffort.symbols.map((symbol, index) => (
                        <span key={index}>{symbol}</span>
                      ))}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${
                        openSubMenu === 'effort' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {openSubMenu === 'effort' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-6 space-y-2"
                  >
                    {effortLevels.map((level) => (
                      <button
                        key={level.name}
                        onClick={() => {
                          setSelectedEffort(level);
                          toggleSubMenu('effort');
                        }}
                        className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg"
                      >
                        <div className="flex gap-1">
                          {level.symbols}
                        </div>
                        <span className="text-sm text-gray-700">{level.name}</span>
                        {selectedEffort.name === level.name && (
                          <span className="ml-auto">✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Priority */}
              <div>
                <button
                  onClick={() => toggleSubMenu('priority')}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock size={16} className="text-gray-700" />
                    <span className="text-sm text-gray-700">Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {selectedPriority.symbols}
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${
                        openSubMenu === 'priority' ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openSubMenu === 'priority' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-7 py-1 space-y-1 overflow-hidden"
                    >
                      {priorityLevels.map((level) => (
                        <button
                          key={level.name}
                          onClick={() => {
                            setSelectedPriority(level);
                            toggleSubMenu('priority');
                          }}
                          className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg"
                        >
                          <div className="flex gap-1">
                            {level.symbols}
                          </div>
                          <span className="text-sm text-gray-700">{level.name}</span>
                          {selectedPriority.name === level.name && (
                            <span className="ml-auto">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    {/* Boards Section */}
    <div className="space-y-3">
    <div className="flex items-center px-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none" className="mr-2">
        <path d="M4.625 0.875H2.125C1.79348 0.875 1.47554 1.0067 1.24112 1.24112C1.0067 1.47554 0.875 1.79348 0.875 2.125V4.625M4.625 0.875H10.875C11.2065 0.875 11.5245 1.0067 11.7589 1.24112C11.9933 1.47554 12.125 1.79348 12.125 2.125V4.625M4.625 0.875V12.125M0.875 4.625V10.875C0.875 11.2065 1.0067 11.5245 1.24112 11.7589C1.47554 11.9933 1.79348 12.125 2.125 12.125H4.625M0.875 4.625H12.125M12.125 4.625V10.875C12.125 11.2065 11.9933 11.5245 11.7589 11.7589C11.5245 11.9933 11.2065 12.125 10.875 12.125H4.625" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span className="text-sm font-medium text-gray-900">Boards</span>
        <button className="ml-auto p-1 hover:bg-gray-50 rounded">
        +
        </button>
    </div>
    <div className="space-y-1">
        <div className="p-3 bg-gray-100 rounded-lg text-sm text-gray-900 cursor-pointer">
        Mallorca
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg text-sm text-gray-900 cursor-pointer">
        Mallorca
        </div>
        <div className="p-3 bg-red-50 rounded-lg text-sm text-gray-900 cursor-pointer">
        Mallorca
        </div>
    </div>
    </div>
    </div>
  );
};

export default SidebarMenu;


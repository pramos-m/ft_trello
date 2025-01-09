import { useState } from 'react';
import { ChevronDown, ChevronRight, Paperclip, PaintBucket, Filter, Clock, Timer } from 'lucide-react';

const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null);
  };

  const toggleSubMenu = (submenu) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

  const colorOptions = [
    { name: 'Rojo', color: 'bg-red-500' },
    { name: 'Naranja', color: 'bg-orange-500' },
    { name: 'Verde', color: 'bg-green-500' },
    { name: 'Cian', color: 'bg-cyan-500' },
    { name: 'Azul', color: 'bg-blue-500' },
    { name: 'Violeta', color: 'bg-violet-500' },
    { name: 'Negro', color: 'bg-black' }
  ];

  const priorityLevels = [
    { name: 'None', color: 'bg-gray-200' },
    { name: 'Low', color: 'bg-green-200' },
    { name: 'Medium', color: 'bg-yellow-200' },
    { name: 'High', color: 'bg-red-200' }
  ];

  return (
    <div className="w-64 bg-gray-50 p-4 space-y-2">
      {/* Tasks Section */}
      <div className="flex items-center justify-between p-2 bg-gray-200 rounded">
        <div className="flex items-center gap-2">
          <Paperclip size={20} />
          <span>Tasks</span>
        </div>
        <span className="bg-gray-700 text-white px-2 rounded">6</span>
      </div>

      {/* Background Color Section */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('background')}
          className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded"
        >
          <div className="flex items-center gap-2">
            <PaintBucket size={20} />
            <span>Background</span>
          </div>
          {openMenu === 'background' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {openMenu === 'background' && (
          <div className="absolute left-0 mt-1 w-full bg-white rounded-lg shadow-lg py-2 z-10">
            {colorOptions.map((option) => (
              <div 
                key={option.name}
                onClick={() => setSelectedColor(option.name)}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full ${option.color}`}></div>
                  <span className="text-gray-700">{option.name}</span>
                </div>
                {selectedColor === option.name && (
                  <Check size={16} className="text-gray-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters Section */}
      <div className="relative">
        <button
          onClick={() => toggleMenu('filters')}
          className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded"
        >
          <div className="flex items-center gap-2">
            <Filter size={20} />
            <span>Filters</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm bg-gray-200 px-2 rounded-full">0</span>
            {openMenu === 'filters' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </button>
        
        {openMenu === 'filters' && (
          <div className="pl-4">
            {/* Effort Submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubMenu('effort')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded"
              >
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>Effort</span>
                </div>
                {openSubMenu === 'effort' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {openSubMenu === 'effort' && (
                <div className="pl-4">
                  <div className="flex flex-col gap-2 py-2">
                    <div className="flex items-center justify-between p-1">
                      <span>None</span>
                      <div className="w-4 h-4"></div>
                    </div>
                    <div className="flex items-center justify-between p-1">
                      <span>Low</span>
                      <div className="flex">🔄</div>
                    </div>
                    <div className="flex items-center justify-between p-1">
                      <span>Medium</span>
                      <div className="flex">🔄 🔄</div>
                    </div>
                    <div className="flex items-center justify-between p-1">
                      <span>High</span>
                      <div className="flex">🔄 🔄 🔄</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Priority Submenu */}
            <div className="relative">
              <button
                onClick={() => toggleSubMenu('priority')}
                className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded"
              >
                <div className="flex items-center gap-2">
                  <Timer size={20} />
                  <span>Priority</span>
                </div>
                {openSubMenu === 'priority' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </button>
              
              {openSubMenu === 'priority' && (
                <div className="pl-4">
                  {priorityLevels.map((level) => (
                    <div key={level.name} className="flex items-center justify-between p-2">
                      <span>{level.name}</span>
                      <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarMenu;
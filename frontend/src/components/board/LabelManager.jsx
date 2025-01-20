import { useState, useEffect } from 'react';

export const useLabelManager = (initialSelectedLabels = []) => {
  const [selectedLabels, setSelectedLabels] = useState(initialSelectedLabels);
  const [availableLabels, setAvailableLabels] = useState([
    { id: 'blog', name: 'Blog', color: 'bg-green-100 text-green-800' },
    { id: 'frontend', name: 'Frontend', color: 'bg-pink-100 text-pink-800' },
    { id: 'backend', name: 'Backend', color: 'bg-yellow-100 text-yellow-800' },
  ]);

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

  return {
    selectedLabels,
    setSelectedLabels,
    availableLabels,
    setAvailableLabels,
    handleLabelSelect,
    handleDeleteLabel,
    handleColorChange
  };
};

export const LabelDisplay = ({ selectedLabels, availableLabels, onEditClick }) => {
  return (
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
      {onEditClick && (
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEditClick();
          }}
          className="px-3 py-1 rounded-full text-sm text-gray-600 hover:bg-gray-50"
        >
          + Edit labels
        </button>
      )}
    </div>
  );
};
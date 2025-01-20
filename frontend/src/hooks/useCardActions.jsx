import { useState } from 'react';
import { useBoard } from '../context/BoardContext';

export const useCardActions = (card, columnId) => {
  const { updateCard } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [effort, setEffort] = useState(card.effort || 'Low');
  const [priority, setPriority] = useState(card.priority || 'Low');

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
  };

  const handlePriorityChange = (level) => {
    setPriority(level);
    updateCard(columnId, card.id, { ...card, priority: level });
  };

  return {
    isEditing,
    setIsEditing,
    title,
    setTitle,
    description,
    setDescription,
    effort,
    priority,
    handleSaveCard,
    handleEffortChange,
    handlePriorityChange
  };
};


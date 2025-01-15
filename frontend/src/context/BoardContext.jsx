import { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

const defaultLabels = [
  { id: 'label-1', name: 'Blog', color: 'green' },
  { id: 'label-2', name: 'Frontend', color: 'pink' },
  { id: 'label-3', name: 'Backend', color: 'yellow' }
];

export function BoardProvider({ children }) {
  const [columns, setColumns] = useState({});
  const [labels, setLabels] = useState(defaultLabels);
  const [filters, setFilters] = useState({
    effort: 'None',
    priority: 'None'
  });

  const addLabel = (name, color) => {
    const newLabel = {
      id: `label-${Date.now()}`,
      name,
      color
    };
    setLabels(prev => [...prev, newLabel]);
    return newLabel;
  };

  const updateLabel = (labelId, updates) => {
    setLabels(prev => prev.map(label => 
      label.id === labelId ? { ...label, ...updates } : label
    ));
  };

  const deleteLabel = (labelId) => {
    setLabels(prev => prev.filter(label => label.id !== labelId));
    // Remove the label from all cards
    setColumns(prev => {
      const newColumns = { ...prev };
      Object.keys(newColumns).forEach(columnId => {
        newColumns[columnId].cards = newColumns[columnId].cards.map(card => ({
          ...card,
          labels: card.labels?.filter(id => id !== labelId) || []
        }));
      });
      return newColumns;
    });
  };

  const addCardLabel = (columnId, cardId, labelId) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      const cardIndex = newColumns[columnId].cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        const card = newColumns[columnId].cards[cardIndex];
        const currentLabels = card.labels || [];
        if (!currentLabels.includes(labelId)) {
          newColumns[columnId].cards[cardIndex] = {
            ...card,
            labels: [...currentLabels, labelId]
          };
        }
      }
      return newColumns;
    });
  };

  const removeCardLabel = (columnId, cardId, labelId) => {
    setColumns(prev => {
      const newColumns = { ...prev };
      const cardIndex = newColumns[columnId].cards.findIndex(card => card.id === cardId);
      if (cardIndex !== -1) {
        const card = newColumns[columnId].cards[cardIndex];
        newColumns[columnId].cards[cardIndex] = {
          ...card,
          labels: (card.labels || []).filter(id => id !== labelId)
        };
      }
      return newColumns;
    });
  };


  const addCard = (columnId, card) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        cards: [...prev[columnId].cards, card],
      },
    }));
  };

  const updateCard = (columnId, cardId, updates) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      const cardIndex = newColumns[columnId].cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        newColumns[columnId].cards[cardIndex] = {
          ...newColumns[columnId].cards[cardIndex],
          ...updates,
        };
      }
      return newColumns;
    });
  };

  const deleteCard = (columnId, cardId) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      newColumns[columnId].cards = newColumns[columnId].cards.filter(
        (card) => card.id !== cardId
      );
      return newColumns;
    });
  };

  const addColumn = (title) => {
    const newColumnId = `column-${Date.now()}`;
    setColumns((prev) => ({
      ...prev,
      [newColumnId]: {
        id: newColumnId,
        title,
        description: '',
        cards: [],
      },
    }));
  };

  const updateColumn = (columnId, updates) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        ...updates,
      },
    }));
  };

  const deleteColumn = (columnId) => {
    setColumns((prev) => {
      const { [columnId]: _, ...rest } = prev;
      return rest;
    });
  };

  const moveCard = (fromColumnId, toColumnId, cardId, targetIndex) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      const fromColumn = newColumns[fromColumnId];
      const toColumn = newColumns[toColumnId];
      const card = fromColumn.cards.find((c) => c.id === cardId);

      if (card) {
        fromColumn.cards = fromColumn.cards.filter((c) => c.id !== cardId);
        if (fromColumnId === toColumnId) {
          fromColumn.cards.splice(targetIndex, 0, card);
        } else {
          toColumn.cards.splice(targetIndex, 0, card);
        }
      }
      return newColumns;
    });
  };

  const reorderColumns = (sourceIndex, destinationIndex) => {
    setColumns((prev) => {
      const columnIds = Object.keys(prev);
      const [movedId] = columnIds.splice(sourceIndex, 1);
      columnIds.splice(destinationIndex, 0, movedId);

      const reorderedColumns = {};
      columnIds.forEach((id) => {
        reorderedColumns[id] = prev[id];
      });

      return reorderedColumns;
    });
  };

  const updateColumnDescription = (columnId, description) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        description,
      },
    }));
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const getFilteredCards = (cards) => {
    return cards.filter(card => {
      const effortMatch = filters.effort === 'None' || card.effort === filters.effort;
      const priorityMatch = filters.priority === 'None' || card.priority === filters.priority;
      return effortMatch && priorityMatch;
    });
  };

  const getTotalFilteredCards = () => {
    return Object.values(columns).reduce((total, column) => {
      const filteredColumnCards = getFilteredCards(column.cards);
      return total + filteredColumnCards.length;
    }, 0);
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        filters,
        labels,
        addLabel,
        updateLabel,
        deleteLabel,
        addCardLabel,
        removeCardLabel,
        addCard,
        updateCard,
        deleteCard,
        addColumn,
        updateColumn,
        deleteColumn,
        moveCard,
        reorderColumns,
        updateColumnDescription,
        updateFilters,
        getFilteredCards,
        getTotalFilteredCards
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);

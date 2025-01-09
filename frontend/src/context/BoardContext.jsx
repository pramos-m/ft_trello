import { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [columns, setColumns] = useState({});
  const [filters, setFilters] = useState({
    effort: 'None',
    priority: 'None'
  });

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

  return (
    <BoardContext.Provider
      value={{
        columns,
        filters,
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = () => useContext(BoardContext);
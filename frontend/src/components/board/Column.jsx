import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBoard } from "../../context/BoardContext";
import Card from "./Card";
import AddCard from "./AddCard";

export default function Column({ column, draggingCard, setDraggingCard, index }) {
  const { columns, moveCard, reorderColumns, updateColumn } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [description, setDescription] = useState(column.description || '');
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isDraggingToTrash, setIsDraggingToTrash] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [placeholderIndex, setPlaceholderIndex] = useState(null);
  const { getFilteredCards } = useBoard();
  
  const MAX_VISIBLE_DESCRIPTION_LENGTH = 100;

  const editRef = useRef(null);
  const columnRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const dragThrottleRef = useRef(null);
  const addCardRef = useRef(null);

  const MAX_DESCRIPTION_LENGTH = 383;

  useEffect(() => {
    setTitle(column.title);
    setDescription(column.description || '');
  }, [column.title, column.description]);

  // Actualizar la altura del placeholder cuando cambia la carta arrastrada
  useEffect(() => {
    if (draggingCard) {
      const draggedElement = document.querySelector('.dragging-card');
      if (draggedElement) {
        setPlaceholderHeight(draggedElement.offsetHeight);
      }
    } else {
      setPlaceholderHeight(0);
      setPlaceholderIndex(null);
    }
  }, [draggingCard]);


  // Handle changes in the description field
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(newDescription);
    }
  };

    // Nuevo manejador para guardar cambios
    const handleSaveChanges = () => {
      setIsEditing(false);
      if (title !== column.title || description !== column.description) {
        updateColumn(column.id, { title, description });
      }
    };
  
    // Nuevo manejador para la tecla Enter
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSaveChanges();
      }
    };
  
  

  // Drag-and-drop handlers
  const handleDragStart = (e) => {
    e.dataTransfer.setData('columnIndex', index.toString());
    e.dataTransfer.setData('columnId', column.id);
    e.dataTransfer.setData('type', 'column');
    columnRef.current.classList.add('dragging-column');
    setIsDraggingToTrash(true);
  };
  
  const handleDragEnd = () => {
    columnRef.current.classList.remove('dragging-column');
    setIsDraggingOver(false);
    setDragOverIndex(null);
    setIsDraggingToTrash(false);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const getTruncatedDescription = (text) => {
    if (!text || text.length <= MAX_VISIBLE_DESCRIPTION_LENGTH) return text;
    return text.substring(0, MAX_VISIBLE_DESCRIPTION_LENGTH) + '...';
  };
  
  const calculateCardDropIndex = (e) => {
    const containerRect = cardsContainerRef.current.getBoundingClientRect();
    const mouseY = e.clientY - containerRect.top + cardsContainerRef.current.scrollTop;
    const cards = Array.from(cardsContainerRef.current.querySelectorAll('.card-container'));
    
    // Si el ratón está sobre el AddCard
    const addCardRect = addCardRef.current.getBoundingClientRect();
    if (mouseY > addCardRect.top - containerRect.top) {
      return column.cards.length;
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.top - containerRect.top + cardRect.height / 2;
      
      if (mouseY < cardCenter) {
        return i;
      }
    }
    
    return column.cards.length;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (dragThrottleRef.current) return;

    dragThrottleRef.current = setTimeout(() => {
      dragThrottleRef.current = null;
    }, 50);

    const isColumnDrag = e.dataTransfer.types.includes('columnIndex');
    if (isColumnDrag) {
      const rect = columnRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      setDragOverIndex(mouseX < rect.width / 2 ? index : index + 1);
      setIsDraggingOver(true);
    } else if (draggingCard) {
      const newIndex = calculateCardDropIndex(e);
      if (newIndex !== dragOverIndex) {
        setDragOverIndex(newIndex);
        setPlaceholderIndex(newIndex);
      }
      setIsDraggingOver(true);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDraggingOver(false);
      setDragOverIndex(null);
      setPlaceholderIndex(null);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('columnIndex'));
    const dropType = e.dataTransfer.getData('type');

    if (dropType === 'column' && !isNaN(sourceIndex)) {
      reorderColumns(sourceIndex, dragOverIndex ?? index);
    } else if (draggingCard) {
      const fromColumnId = Object.keys(columns).find((colId) =>
        columns[colId].cards.some((card) => card.id === draggingCard.id)
      );

      if (fromColumnId) {
        const targetIndex = dragOverIndex ?? column.cards.length;
        moveCard(fromColumnId, column.id, draggingCard.id, targetIndex);
      }
    }

    setDraggingCard(null);
    setDragOverIndex(null);
    setIsDraggingOver(false);
    setPlaceholderIndex(null);
  };

  // Save changes when clicking outside
  const handleClickOutside = (event) => {
    if (editRef.current && !editRef.current.contains(event.target)) {
      setIsEditing(false);
      if (title !== column.title || description !== column.description) {
        updateColumn(column.id, { title, description });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, description, column.id, column.title, column.description]);

  const getCardStyle = (idx) => {
    if (!isDraggingOver || dragOverIndex === null || !draggingCard) return {};
  
    const draggedElement = document.querySelector('.dragging-card');
    const offset = draggedElement ? draggedElement.offsetHeight + 8 : 0;
    const isAfterDragPoint = idx >= dragOverIndex;
    const isSameColumn = Object.keys(columns).find((colId) =>
      columns[colId].cards.some((card) => card.id === draggingCard.id)
    ) === column.id;
  
    if (idx === dragOverIndex) {
      return { 
        marginTop: `${offset}px`,
        transition: 'margin-top 0.2s ease-out'
      };
    }
  
    if (isAfterDragPoint && isSameColumn) {
      return {
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.2s ease-out'
      };
    }
  
    return {
      transform: 'translateY(0)',
      transition: 'transform 0.2s ease-out'
    };
  };
  
  const getColumnPreviewStyle = () => {
    if (!isDraggingOver || draggingCard || dragOverIndex === null) return {};

    const width = columnRef.current.offsetWidth;
    return {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: `${width}px`,
      left: dragOverIndex <= index ? 0 : 'auto',
      right: dragOverIndex > index ? 0 : 'auto',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '2px dashed rgb(59, 130, 246)',
      borderRadius: '0.5rem',
      pointerEvents: 'none',
    };
  };

  return (
    <motion.div
      ref={columnRef}
      draggable
      layout
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-72 shrink-0 ${isDraggingToTrash ? 'opacity-50' : ''}`}
    >
      <div style={getColumnPreviewStyle()} />
      <div className="bg-[#F1F4FF] rounded-lg">
        <div ref={editRef} className="px-4 py-3" onClick={() => setIsEditing(true)}>
          <div className="flex justify-between items-center mb-2">
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-base font-medium bg-transparent rounded border border-neutral-300 px-2 py-1 focus:outline-none focus:border-blue-500"
                autoFocus
                placeholder="Column title"
              />
            ) : (
              <div className="flex justify-between items-center w-full">
                <h2 className="text-base font-medium text-neutral-900">{title}</h2>
                <span className="bg-[#F1F4FF] rounded-lg">
                  {column.cards.length}
                </span>
              </div>
            )}
          </div>

          {/* Description Section */}
          {(isEditing || column.description) && (
            <div className="mt-2">
              {isEditing ? (
                <div>
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded border border-neutral-300 px-2 py-1 text-sm resize-vertical bg-transparent focus:outline-none focus:border-blue-500"
                    rows={2}
                    placeholder="Add description..."
                  />
                </div>
              ) : (
                column.description && (
                  <p className="text-sm text-neutral-600 break-words">
                    {getTruncatedDescription(column.description)}
                  </p>
                )
              )}
            </div>
          )}
        </div>
        {/* Cards Container */}
        <div 
          ref={cardsContainerRef} 
          className="px-4 pb-4 space-y-2 min-h-[1px]"
        >
          <AnimatePresence mode="popLayout">c
            {getFilteredCards(column.cards).map((card, idx) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
                className="card-container"
                style={getCardStyle(idx)}
              >
                {idx === placeholderIndex && (
                  <div
                    className="rounded-lg border-2 border-blue-400 border-dashed bg-blue-50 mb-2"
                    style={{ height: placeholderHeight }}
                  />
                )}
                <Card
                  card={card}
                  columnId={column.id}
                  index={idx}
                  setDraggingCard={setDraggingCard}
                />
              </motion.div>
            ))}
            
            {placeholderIndex === column.cards.length && (
              <div
                className="rounded-lg border-2 border-blue-400 border-dashed bg-blue-50 mb-2"
                style={{ height: placeholderHeight }}
              />
            )}
          </AnimatePresence>

          {/* Add Card Container */}
          <motion.div
            ref={addCardRef}
            layout
            className={`pt-2 ${isDraggingOver && dragOverIndex === column.cards.length ? 'mt-2' : ''}`}
          >
            <AddCard columnId={column.id} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
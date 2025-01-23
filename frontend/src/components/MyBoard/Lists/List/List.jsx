import { useState, useRef, useEffect } from "react";
import useBoard from "hooks/useBoard.js";
import { updateList } from "services/lists.js";
import Tasks from "components/MyBoard/Tasks.jsx";

function BoardList({id, name, description, tasks: tasksId}) {
  const { board, refreshBoard, getFilteredCards } = useBoard();
  const [isEditing, setIsEditing] = useState(false);
  const [listName, setListName] = useState(name);
  const [listDescription, setListDescription] = useState(description || '');
  const editRef = useRef(null);

  const MAX_DESCRIPTION_LENGTH = 383;
  const MAX_VISIBLE_DESCRIPTION_LENGTH = 100;

  useEffect(() => {
    setListName(name);
    setListDescription(description || '');
  }, [name, description]);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    if (newDescription.length <= MAX_DESCRIPTION_LENGTH) {
      setListDescription(newDescription);
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    if (listName !== name || listDescription !== description) {
      updateList({ id, data: { name: listName, description: listDescription } })
        .then(() => refreshBoard());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveChanges();
    }
  };

  const handleClickOutside = (event) => {
    if (editRef.current && !editRef.current.contains(event.target)) {
      setIsEditing(false);
      if (listName !== name || listDescription !== description) {
        updateList({ id, data: { name: listName, description: listDescription } })
          .then(() => refreshBoard());
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [listName, listDescription, id, name, description]);

  const getTruncatedDescription = (text) => {
    if (!text || text.length <= MAX_VISIBLE_DESCRIPTION_LENGTH) return text;
    return text.substring(0, MAX_VISIBLE_DESCRIPTION_LENGTH) + '...';
  };

  const tasks = getFilteredCards(board.tasks.filter(({id}) => tasksId.includes(id)));

  return (
    <div className="w-[70%] max-w-[23rem] shrink-0 grow-0">
      <div ref={editRef} className="px-4 py-3" onClick={() => setIsEditing(true)}>
        <div className="flex justify-between items-center mb-2">
          {isEditing ? (
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-base font-medium bg-transparent rounded border border-neutral-300 px-2 py-1 focus:outline-none focus:border-blue-500"
              autoFocus
              placeholder="List name"
            />
          ) : (
            <div className="flex justify-between items-center w-full">
              <h2 className="text-base font-medium text-neutral-900">{listName}</h2>
              <span className="bg-logos-white-bluish rounded-lg">
                {tasks.length}
              </span>
            </div>
          )}
        </div>

        {(isEditing || listDescription) && (
          <div className="mt-2">
            {isEditing ? (
              <textarea
                value={listDescription}
                onChange={handleDescriptionChange}
                onKeyDown={handleKeyDown}
                className="w-full rounded border border-neutral-300 px-2 py-1 text-sm resize-vertical bg-transparent focus:outline-none focus:border-blue-500"
                rows={2}
                placeholder="Add description..."
              />
            ) : (
              listDescription && (
                <p className="text-sm text-neutral-600 break-words">
                  {getTruncatedDescription(listDescription)}
                </p>
              )
            )}
          </div>
        )}
      </div>

      <Tasks tasks={tasks} listId={id}/>
    </div>
  );
}

export default BoardList;
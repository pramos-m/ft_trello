import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import BoardContext from "../../context/BoardContext.js";
import { getBoard, deleteBoard } from "../../services/boards.js";
import { createColumn, updateColumn, deleteColumn } from "../../services/columns.js";
import { createCard, updateCard, deleteCard } from "../../services/cards.js";

function BoardProvider({ children }) {
	const	{ boardId: id } = useParams();
	const	[board, setBoard] = useState({});
	const	[error, setError] = useState(null);
	const	navigate = useNavigate();

	const	refreshBoard = () => {
		getBoard({id})
			.then(data => setBoard(data))
			.catch(err => setError(err));
	};

	const	removeBoard = () => {
		deleteBoard({id})
			.then(() => navigate("/"))
			.catch(err => setError(err));
	};

	useEffect(refreshBoard, [id]);

	const	fetchProperty = ({params, cb}) => {
		cb(params)
			.then(() => refreshBoard())
			.catch(err => setError(err));
	};

	const	createProperty = ({data, cb}) => fetchProperty({
		params: {
			data: {
				...data,
				boardId: id
			}
		},
		cb
	});

	const	updateProperty = ({propertyId, data, cb}) => fetchProperty({
		params: {
			id: propertyId,
			data
		},
		cb
	});

	const	deleteProperty = ({propertyId, cb}) => fetchProperty({
		params: {id: propertyId},
		cb
	});

	//const	updateBoard = (updates) => {
	//	updateBoard({id, data: updates})
	//		.then(data => setBoard(data))
	//		.catch(err => setError(err));
	//};

  //const addColumn = title => {
	//	createColumn({id, data: {title}})
	//		.then(column => setBoard(prev => ({
	//			...prev,
	//			columns: [
	//				...prev.columns,
	//				column,
	//			]
	//		})))
	//		.catch(err => setError(err));
  //};

  //const updateProperty = ({propertyId, updates, property, update}) => {
	//	update({id: propertyId, data: updates})
	//		.then(data => setBoard(prev => ({
	//			...prev,
	//			...data
	//		})))
	//		.catch(err => setError(err));
	//}

  //const updateArrayProperty = ({propertyId, updates, property, update}) => {
	//	update({id: propertyId, data: updates})
	//		.then(data => setBoard(prev => ({
	//			...prev,
	//			[property]: [
	//				...prev[property].filter(filter),
	//				data,
	//			]
	//		})))
	//		.catch(err => setError(err));
	//}

  //const updateObjectProperty = ({propertyId, updates, property, update}) => {
	//	update({id: propertyId, data: updates})
	//		.then(data => setBoard(prev => ({
	//			...prev,
	//			[property]: {
	//				...prev[property].filter(({_id}) => _id !== data._id),
	//				[data._id]: data,
	//			}
	//		})))
	//		.catch(err => setError(err));
	//}

  //const updateBoardColumn = (columnId, updates) => updateProperty({
	//	propertyId: columnId,
	//	updates,
	//	property: "columns",
	//	update: updateColumn,
	//	filter: ({_id}) => _id !== columnId,
	//});

  //const updateColumn = (columnId, updates) => {
	//	updateColumn({id: columnId, data: updates})
	//		.then(column => setBoard(prev => ({
	//			...prev,
	//			columns: [
	//				...prev.columns.filter(({id}) => id !== column._id),
	//				column,
	//			]
	//		})))
	//		.catch(err => setError(err));
  //};

  //const deleteColumn = (columnId) => {
	//	deleteColumn({id: columnId})
	//		.then(column => setBoard(prev => ({
	//			...prev,
	//			columns: [
	//				...prev.columns.filter(({id}) => id !== column._id),
	//			]
	//		})))
	//		.catch(err => setError(err));
  //};

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

  // const updateColumnDescription = (columnId, description) => {
  //   setColumns((prev) => ({
  //     ...prev,
  //     [columnId]: {
  //       ...prev[columnId],
  //       description,
  //     },
  //   }));
  // };

  //const addCard = (columnId, card) => {
  //  setColumns((prev) => ({
  //    ...prev,
  //    [columnId]: {
  //      ...prev[columnId],
  //      cards: [...prev[columnId].cards, card],
  //    },
  //  }));
  //};

  //const updateCard = (columnId, cardId, updates) => {
  //  setColumns((prev) => {
  //    const newColumns = { ...prev };
  //    const cardIndex = newColumns[columnId].cards.findIndex((card) => card.id === cardId);
  //    if (cardIndex !== -1) {
  //      newColumns[columnId].cards[cardIndex] = {
  //        ...newColumns[columnId].cards[cardIndex],
  //        ...updates,
  //      };
  //    }
  //    return newColumns;
  //  });
  //};

  //const deleteCard = (columnId, cardId) => {
  //  setColumns((prev) => {
  //    const newColumns = { ...prev };
  //    newColumns[columnId].cards = newColumns[columnId].cards.filter(
  //      (card) => card.id !== cardId
  //    );
  //    return newColumns;
  //  });
  //};

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

  return (
    <BoardContext.Provider
      value={{
				board,
				refreshBoard,
				deleteBoard: removeBoard,
				addColumn: ({data}) => createProperty({data, cb: createColumn}),
				updateColumn: ({columnId, data}) => updateProperty({propertyId: columnId, data, cb: updateColumn}),
				deleteColumn: ({columnId}) => deleteProperty({propertyId: columnId, cb: deleteColumn}),
				addCard: ({data}) => createProperty({data, cb: createCard}),
				updateCard: ({cardId, data}) => updateProperty({propertyId: cardId, data, cb: updateCard}),
				deleteCard: ({cardId}) => deleteProperty({propertyId: cardId, cb: deleteCard}),
				reorderColumns,
        moveCard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
} 

export default BoardProvider;

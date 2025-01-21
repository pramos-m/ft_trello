export function	updateArrayItemFieldsById(array, itemId, fields) {
	const	arrayClone = [...array];
	const	item = arrayClone.find(({id}) => id == itemId);

	if (item)
		arrayClone.splice(arrayClone.indexOf(item), 1, {...item, ...fields});
	return (arrayClone);
}

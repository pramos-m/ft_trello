function	BoardAddTask() {
	const description = "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es ";

	return (
		<div className="flex gap-x-2 rounded-[0.625rem] bg-white drop-shadow px-2 py-2.5">
			<img src="/icons/plus.svg" className="w-2.5"/>
			<h1 className="font-regular text-sm">Add a card</h1>
		</div>
	);
}

export default BoardAddTask;

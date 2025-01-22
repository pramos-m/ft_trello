function	BoardTask({name}) {
	const description = "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es ";

	return (
		<div className="flex flex-col gap-y-3 rounded-[0.625rem] bg-white drop-shadow px-2 py-2.5">
			<div className="flex justify-between">
				<h1 className="font-semibold text-sm">{name}</h1>
				<h1 className="font-semibold text-sm">⌚</h1>
			</div>
			<p className="font-regular text-[0.563rem]">{description}</p>
		</div>
	);
}

export default BoardTask;

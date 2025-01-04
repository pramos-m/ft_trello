export function	BoardPreview({name, list_count, tasks_count}) {
	return (
		<div className="shrink-0 w-60 h-32 grid grid-rows-3 grid-cols-2 bg-neutral-grey rounded-2xl">
			<div className="col-span-2 row-span-2 border-b-2 border-white flex justify-center items-center">
				<h1 className="font-dangerless text-[2rem]">{name}</h1>
			</div>
			<div className="border-r-2 border-white flex justify-center items-center">
				<h2 className="font-pompiere text-base">{list_count} lists</h2>
			</div>
			<div className="flex justify-center items-center">
				<h2 className="font-pompiere text-base">{tasks_count} cards</h2>
			</div>
		</div>
	);
}

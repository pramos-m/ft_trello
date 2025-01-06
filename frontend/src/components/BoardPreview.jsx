export function	BoardPreview({width, name, lists, tasks, color}) {
	return (
		<div className="shrink-0 h-32 grid grid-rows-3 grid-cols-2 rounded-2xl"
					style={{width, backgroundColor: color}}
		>
			<div className="col-span-2 row-span-2 border-b-2 border-white flex justify-center items-center">
				<h1 className="font-dangerless text-[2rem]">{name}</h1>
			</div>
			<div className="border-r-2 border-white flex justify-center items-center">
				<h2 className="font-pompiere text-base">{lists} lists</h2>
			</div>
			<div className="flex justify-center items-center">
				<h2 className="font-pompiere text-base">{tasks} tasks</h2>
			</div>
		</div>
	);
}

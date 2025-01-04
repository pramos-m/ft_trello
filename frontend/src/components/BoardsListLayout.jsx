import { NewBoard } from "./NewBoard.jsx";
import { Carousel } from "./Carousel.jsx";
import { BoardPreview } from "./BoardPreview.jsx";

export function	BoardsListLayout({title, boards, create, direction}) {
	//const	twClassName = "w-full h-[70%] flex gap-4 overflow-x-auto hide-scrollbar";
	const	twClassName = `w-full h-full flex flex-nowrap flex-${direction == 'x' ? "row" : "col"} gap-${direction}-4`;

	boards.forEach(board =>
		board["width"] = direction == 'x' ? "16rem" : "100%"
	);

	return (
		<div className="flex flex-col flex-nowrap w-[95%] overflow-hidden gap-y-4">
			<div className="flex justify-between">
				<h1 className="font-semibold text-xl">{title}</h1>
				{ create && <NewBoard/> }
			</div>
			<Carousel twClassName={twClassName} cards={boards} CardComponent={BoardPreview} direction={direction}/>
		</div>
	);
}

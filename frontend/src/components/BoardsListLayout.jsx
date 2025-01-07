import { NewBoard } from "./NewBoard.jsx";
import { Carousel } from "./Carousel.jsx";
import { BoardPreview } from "./BoardPreview.jsx";

export function	BoardsListLayout({title, boards, create, direction, refresh}) {
	const	twClassName = `w-full h-full flex flex-nowrap ${direction == 'x' ? "flex-row gap-x-4 overflow-x-auto" : "flex-col gap-y-4 overflow-y-auto"} hide-scrollbar`;

	const	newBoards = boards.map(board => ({
			...board,
			width: direction == 'x' ? "16rem" : "100%",
			carouselId: `${title} ${board.id}`
		})
	);

	return (
		<div className="flex flex-col flex-nowrap w-[95%] min-h-44 overflow-hidden gap-y-4">
			<div className="flex justify-between">
				<h1 className="font-semibold text-xl">{title}</h1>
				{ create && <NewBoard refresh={refresh}/> }
			</div>
			{
				boards.length > 0 ?
					<Carousel twClassName={twClassName} cards={newBoards} CardComponent={BoardPreview} direction={direction}/>
				:
					<h1>There aren't any board yet</h1>
			}
		</div>
	);
}
